import { Actor, log } from 'apify';
import {
  collectPublicationCandidates,
  createPostCandidate,
  createUnavailableResult,
  fetchPublicResource,
  finalizeResult,
  mapLimit,
  normalizeInput,
  parsePostHtml,
  postDedupeKey,
  resultMatchesDateFilter,
} from './substack.js';

await Actor.init();

const PAY_PER_RESULT_EVENT = 'public-post-result';

const startedAt = new Date();
const scrapedAt = startedAt.toISOString();
const rawInput = await Actor.getInput();
const input = normalizeInput(rawInput || {});
const chargingManager = Actor.getChargingManager();
const pricingInfo = chargingManager.getPricingInfo();
const isPayPerResultEnabled = pricingInfo.isPayPerEvent
  && Object.prototype.hasOwnProperty.call(pricingInfo.perEventPrices, PAY_PER_RESULT_EVENT);
const stats = {
  startedAt: startedAt.toISOString(),
  finishedAt: null,
  status: 'running',
  pricingModel: pricingInfo.pricingModel || null,
  chargeEventName: PAY_PER_RESULT_EVENT,
  payPerResultEnabled: isPayPerResultEnabled,
  publicationUrls: input.publicationUrls,
  postUrls: input.postUrls,
  publicationsProcessed: 0,
  publicationFeedsRead: 0,
  postCandidatesFound: 0,
  postPagesFetched: 0,
  postsPushed: 0,
  chargedResultEvents: 0,
  duplicatesSkipped: 0,
  postsFilteredByDate: 0,
  postsSkippedByChargeLimit: 0,
  unavailablePosts: 0,
  previewOnlyPosts: 0,
  warnings: [],
};

log.info('Starting Substack public publication and post scrape', {
  publicationUrls: input.publicationUrls.length,
  postUrls: input.postUrls.length,
  maxPostsPerPublication: input.maxPostsPerPublication,
  includePostText: input.includePostText,
  includeExcerpt: input.includeExcerpt,
  includeAuthorInfo: input.includeAuthorInfo,
  includePublicationInfo: input.includePublicationInfo,
  dateFrom: input.dateFrom?.toISOString?.() || null,
  dateTo: input.dateTo?.toISOString?.() || null,
  maxConcurrency: input.maxConcurrency,
  pricingModel: stats.pricingModel,
  payPerResultEnabled: stats.payPerResultEnabled,
});

const candidates = [];

for (const publicationUrl of input.publicationUrls) {
  try {
    log.info(`Reading public Substack publication: ${publicationUrl}`);
    const publication = await collectPublicationCandidates(publicationUrl, input, {
      log,
      scrapedAt,
    });

    stats.publicationsProcessed += 1;
    if (publication.feedUrl) stats.publicationFeedsRead += 1;
    candidates.push(...publication.candidates);

    log.info(`Found ${publication.candidates.length} public post candidates`, {
      publicationUrl,
      feedUrl: publication.feedUrl,
      publicationName: publication.publicationInfo.publicationName,
    });
  } catch (error) {
    const warning = `Could not process publication ${publicationUrl}: ${error.message}`;
    stats.warnings.push(warning);
    log.warning(warning);
  }
}

for (const postUrl of input.postUrls) {
  candidates.push(createPostCandidate({
    postUrl,
    sourceInputUrl: postUrl,
    scrapedAt,
  }));
}

stats.postCandidatesFound = candidates.length;

const dedupedCandidates = [];
const seenPostKeys = new Set();

for (const candidate of candidates) {
  const key = postDedupeKey(candidate);
  if (input.deduplicateResults && seenPostKeys.has(key)) {
    stats.duplicatesSkipped += 1;
    continue;
  }

  if (input.deduplicateResults) seenPostKeys.add(key);

  if (!resultMatchesDateFilter(candidate, input)) {
    stats.postsFilteredByDate += 1;
    continue;
  }

  dedupedCandidates.push(candidate);
}

let candidatesToFetch = dedupedCandidates;

if (isPayPerResultEnabled) {
  const chargeableResults = chargingManager.calculateMaxEventChargeCountWithinLimit(PAY_PER_RESULT_EVENT);
  if (Number.isFinite(chargeableResults) && chargeableResults < candidatesToFetch.length) {
    stats.postsSkippedByChargeLimit = candidatesToFetch.length - chargeableResults;
    candidatesToFetch = candidatesToFetch.slice(0, chargeableResults);
    log.warning('Run charge limit reached before all candidate posts could be fetched', {
      requestedPosts: dedupedCandidates.length,
      chargeableResults,
      skippedPosts: stats.postsSkippedByChargeLimit,
    });
  }
}

log.info(`Fetching ${candidatesToFetch.length} public Substack post pages`, {
  duplicatesSkipped: stats.duplicatesSkipped,
  filteredByDate: stats.postsFilteredByDate,
  skippedByChargeLimit: stats.postsSkippedByChargeLimit,
});

const results = await mapLimit(candidatesToFetch, input.maxConcurrency, async (candidate) => {
  try {
    const response = await fetchPublicResource(candidate.postUrl, input, {
      label: `post ${candidate.postUrl}`,
      log,
    });
    stats.postPagesFetched += 1;

    if (input.saveDebugHtml) {
      await Actor.setValue(`DEBUG_POST_${stats.postPagesFetched}.html`, response.body, {
        contentType: 'text/html; charset=utf-8',
      });
    }

    const detail = parsePostHtml(response.body, response.url, {
      publicationInfo: candidate,
    });
    const result = finalizeResult(candidate, detail, input, {
      scrapedAt,
    });

    if (!resultMatchesDateFilter(result, input)) {
      stats.postsFilteredByDate += 1;
      return null;
    }

    if (result.accessStatus === 'preview_only') stats.previewOnlyPosts += 1;
    if (result.accessStatus === 'unavailable') stats.unavailablePosts += 1;

    return result;
  } catch (error) {
    const warning = `Could not fetch post ${candidate.postUrl}: ${error.message}`;
    stats.warnings.push(warning);
    stats.unavailablePosts += 1;
    log.warning(warning);

    return createUnavailableResult(candidate, input, {
      scrapedAt,
    });
  }
});

const finalResults = results
  .filter(Boolean)
  .filter((result) => result.postUrl || result.postTitle);

if (finalResults.length) {
  const chargeResult = await Actor.pushData(finalResults, PAY_PER_RESULT_EVENT);
  stats.chargedResultEvents = chargeResult.chargedCount || 0;

  if (chargeResult.eventChargeLimitReached) {
    const warning = 'Run charge limit was reached while pushing result rows.';
    stats.warnings.push(warning);
    log.warning(warning, {
      requestedResults: finalResults.length,
      chargedResultEvents: stats.chargedResultEvents,
    });
  }
}

stats.postsPushed = isPayPerResultEnabled ? stats.chargedResultEvents : finalResults.length;
stats.finishedAt = new Date().toISOString();

if (!finalResults.length && stats.warnings.length) {
  stats.status = 'failed_or_empty';
} else if (!finalResults.length) {
  stats.status = 'no_results';
} else if (stats.warnings.length || stats.unavailablePosts || stats.previewOnlyPosts) {
  stats.status = 'partial';
} else {
  stats.status = 'ok';
}

await Actor.setValue('RUN_SUMMARY', stats);

log.info('Substack scrape finished', {
  status: stats.status,
  postsPushed: stats.postsPushed,
  previewOnlyPosts: stats.previewOnlyPosts,
  unavailablePosts: stats.unavailablePosts,
  warnings: stats.warnings.length,
});

await Actor.exit();
