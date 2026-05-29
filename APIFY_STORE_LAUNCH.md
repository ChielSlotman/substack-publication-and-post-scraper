# Apify Store launch sheet

This file captures the exact launch settings for `esrok/substack-publication-and-post-scraper`.

## Current deployed Actor

- Actor: `esrok/substack-publication-and-post-scraper`
- Actor ID: `kdADonDMGZ5jUPcRj`
- Latest build: `1.0.2`
- Console URL: `https://console.apify.com/organization/PsRG5Th2xygCZgJxh/actors/kdADonDMGZ5jUPcRj`
- GitHub URL: `https://github.com/ChielSlotman/substack-publication-and-post-scraper`
- Public Store URL after publishing: `https://apify.com/esrok/substack-publication-and-post-scraper`

## Store listing

Title:

```text
Substack Publication and Post Scraper
```

Subtitle:

```text
Extract public Substack posts, authors, publication details, dates, URLs, excerpts, and article text for research and AI workflows.
```

SEO title:

```text
Substack Publication and Post Scraper
```

SEO description:

```text
Scrape public Substack posts, authors, publication data, dates, excerpts, URLs, and article text. Export newsletter data for research and AI workflows.
```

Short description:

```text
Extract clean public Substack publication and post data for content research, competitor tracking, AI summaries, and newsletter analysis.
```

Categories:

```text
SOCIAL_MEDIA
NEWS
AI
```

Recommended tags:

```text
substack, newsletter, newsletter scraper, substack scraper, content research, competitor research, market research, public posts, ai workflows, article text, newsletter monitoring, make, zapier, n8n, google sheets, apify api
```

## Pricing

Recommended launch pricing:

```text
Pricing model: Pay per event
Event name: public-post-result
Event title: Public post result
Price: $0.0025 per result
Buyer framing: $2.50 per 1,000 public post results
```

The code already calls `Actor.pushData(finalResults, 'public-post-result')`, so Apify can charge one event per dataset row after monetization is enabled.

## Responsible use position

Use this positioning consistently in the Store copy and support replies:

```text
This Actor extracts publicly visible Substack publication and post information for research, content monitoring, and analysis. It does not log in, bypass paywalls, scrape paid subscriber-only content, collect private user data, or access login-only pages. Paid or preview-only posts are returned only with publicly visible preview data and are marked as preview_only.
```

## Launch blocker

Apify Console currently shows monetization as blocked because billing details and a payment method are not set for the organization. The "Set up monetization" button is disabled until that account setup is completed.

Do not publish this Actor as free first. The Apify publish dialog states that if monetization is added after publishing, it can take 14 days for paid pricing changes to become effective.

## Publish sequence after billing is enabled

1. Open the Actor publication tab:
   `https://console.apify.com/organization/PsRG5Th2xygCZgJxh/actors/kdADonDMGZ5jUPcRj/publication`
2. Open `Monetization`.
3. Select pay-per-event pricing.
4. Add event `public-post-result` at `$0.0025`.
5. Confirm the sample input uses a public publication URL and returns a non-empty dataset.
6. Publish on Store and accept the Apify Store terms.
7. Verify the public Store page:
   `https://apify.com/esrok/substack-publication-and-post-scraper`
8. Run the Store Actor once from the public page and confirm the dataset has public Substack rows.

## Last verified smoke test

Cloud smoke test passed with 2 dataset rows using `examples/local-smoke-input.json`.

- Run: `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/UybPBCaPckC2kOr13`
- Dataset: `https://console.apify.com/storage/datasets/QXJm5uVZ67hw6j5fz`
- Result status: `partial`
- Public rows pushed: `2`
- Preview-only rows: `1`
- Unavailable rows: `0`

