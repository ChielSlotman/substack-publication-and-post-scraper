# Substack Publication and Post Scraper

Extract clean public Substack posts, article text, author names, publication metadata, dates, images, tags, and engagement counts. Built for AI summaries, newsletter research, market intelligence, and competitor content monitoring.

Substack Publication and Post Scraper turns public Substack publication URLs and post URLs into a structured dataset you can export, analyze, summarize, or send into automation workflows.

It does not log in, bypass paywalls, scrape subscriber-only content, or collect hidden private data. If a post is paid or preview-only, the Actor returns only the publicly visible preview information and marks it as `preview_only`.

## What this Actor does

Enter one or more public Substack publication URLs or direct post URLs. The Actor reads public publication pages, public RSS feeds, and public post pages, then returns spreadsheet-ready rows in the Apify dataset.

It can extract:

- Publication name, URL, description, logo, and visible topic/category
- Post title, URL, slug, dates, excerpt, image, tags, and public article text
- Public author name and author profile URL when visible
- Visible likes and comments counts when available on the public page
- Public access status: `public`, `preview_only`, or `unavailable`
- Source input URL and scrape timestamp for every result

## Why use it

This Actor focuses on public-only, no-login Substack extraction with clean spreadsheet-ready output and simple pricing per result.

It is designed for users who want a reliable dataset, not a messy scrape. Each result is shaped for CSV, Excel, JSON, API usage, AI content datasets, RAG pipelines, newsletter monitoring, and automated summaries.

Use it when you want:

- Clean output columns that are easy to filter in a spreadsheet
- Public article text for AI summaries and research workflows
- A simple input form for publication URLs and post URLs
- Clear labeling for public, preview-only, and unavailable posts
- A responsible public-data scraper that avoids private or paid content

## Use cases

- Build AI content datasets from public Substack posts
- Feed public article text into RAG pipelines or summarization workflows
- Monitor public posts from newsletters in a niche
- Track competitor content and publishing frequency
- Research authors, publications, topics, and market narratives
- Export public newsletter data to CSV, Excel, JSON, or API
- Send new public posts to Make, Zapier, n8n, Google Sheets, Airtable, Notion, Slack, or custom systems
- Support market intelligence, media monitoring, and founder research workflows

## Input

At least one `publicationUrls` or `postUrls` entry is required.

| Field | Type | Description |
| --- | --- | --- |
| `publicationUrls` | array | Public Substack publication URLs, for example `https://astralcodexten.substack.com`. The Actor reads public metadata and public RSS feeds. |
| `postUrls` | array | Optional direct public Substack post URLs. Useful when you already know the exact posts to extract. |
| `maxPostsPerPublication` | integer | Maximum posts to collect from each publication feed. Default is `25`; maximum is `500`. |
| `includePostText` | boolean | Include publicly visible article body text or public preview text. Default is `true`. |
| `includeExcerpt` | boolean | Include public excerpts from RSS or page metadata. Default is `true`. |
| `includeAuthorInfo` | boolean | Include public author name and URL when visible. Default is `true`. |
| `includePublicationInfo` | boolean | Include publication name, URL, description, logo, and topic when available. Default is `true`. |
| `dateFrom` | string or null | Optional start date filter, such as `2026-01-01`. |
| `dateTo` | string or null | Optional end date filter, such as `2026-12-31`. |
| `deduplicateResults` | boolean | Remove duplicate posts across publication feeds and direct post URLs. Default is `true`. |
| `maxConcurrency` | integer | Advanced option for parallel public post page requests. Default is `5`. |
| `requestTimeoutSecs` | integer | Advanced request timeout. Default is `30`. |
| `maxRetries` | integer | Advanced retry count for temporary network errors. Default is `2`. |

## Output

Each dataset item is one public Substack post record.

| Field | Description |
| --- | --- |
| `publicationName` | Public publication name when available |
| `publicationUrl` | Public publication URL |
| `publicationDescription` | Public publication description |
| `publicationLogo` | Public logo/image URL |
| `publicationTopic` | Visible topic or category when available |
| `postTitle` | Public post title |
| `postUrl` | Public post URL |
| `postSlug` | Post slug parsed from the URL |
| `authorName` | Public author name when visible |
| `authorUrl` | Public author URL when visible |
| `publishedAt` | Published date when available |
| `updatedAt` | Updated date when available |
| `excerpt` | Public excerpt when enabled |
| `publicPostText` | Public article text or public preview text when enabled |
| `isPaidPreview` | Whether the post appears to be paid/preview-only |
| `isPubliclyReadable` | Whether public article text was readable |
| `accessStatus` | `public`, `preview_only`, or `unavailable` |
| `likesCount` | Visible likes count when available |
| `commentsCount` | Visible comments count when available |
| `imageUrl` | Main image URL when visible |
| `tags` | Visible tags when available |
| `sourceInputUrl` | Original input URL that led to the result |
| `scrapedAt` | Timestamp when the row was scraped |

The Actor also writes `RUN_SUMMARY` to the default key-value store with result counts, warnings, and run status.

## Example input

```json
{
  "publicationUrls": ["https://astralcodexten.substack.com"],
  "postUrls": [],
  "maxPostsPerPublication": 10,
  "includePostText": true,
  "includeExcerpt": true,
  "includeAuthorInfo": true,
  "includePublicationInfo": true,
  "dateFrom": null,
  "dateTo": null,
  "deduplicateResults": true,
  "maxConcurrency": 5
}
```

Direct post example:

```json
{
  "publicationUrls": [],
  "postUrls": [
    "https://www.astralcodexten.com/p/book-review-the-dialectical-imagination"
  ],
  "maxPostsPerPublication": 1,
  "includePostText": true,
  "deduplicateResults": true
}
```

## Example output

```json
{
  "publicationName": "Astral Codex Ten",
  "publicationUrl": "https://www.astralcodexten.com",
  "publicationDescription": "P(A|B) = [P(A)*P(B|A)]/P(B), all the rest is commentary.",
  "publicationLogo": "https://substackcdn.com/image/fetch/...",
  "publicationTopic": null,
  "postTitle": "Book Review: The Dialectical Imagination",
  "postUrl": "https://www.astralcodexten.com/p/book-review-the-dialectical-imagination",
  "postSlug": "book-review-the-dialectical-imagination",
  "authorName": "Scott Alexander",
  "authorUrl": null,
  "publishedAt": "2026-05-29T15:01:57.000Z",
  "updatedAt": "2026-05-29T15:01:57.859Z",
  "excerpt": "Public excerpt text...",
  "publicPostText": "The visible public article text or public preview text...",
  "isPaidPreview": false,
  "isPubliclyReadable": true,
  "accessStatus": "public",
  "likesCount": 22,
  "commentsCount": null,
  "imageUrl": "https://substackcdn.com/image/fetch/...",
  "tags": [],
  "sourceInputUrl": "https://astralcodexten.substack.com",
  "scrapedAt": "2026-05-29T12:00:00.000Z"
}
```

## How to run

1. Open the Actor in Apify.
2. Add one or more public Substack publication URLs or direct post URLs.
3. Set `maxPostsPerPublication`.
4. Choose whether to include public post text, excerpts, author info, and publication info.
5. Add optional date filters if you only want posts from a specific period.
6. Run the Actor.
7. Open the Dataset tab to view or export the results.

For scheduled monitoring, create an Apify schedule and use date filters or downstream deduplication to process only new rows.

## Export and integrations

Apify datasets can be exported as:

- CSV
- Excel
- JSON
- JSONL
- XML
- RSS

You can use the results with:

- Apify API
- Make
- Zapier
- n8n
- Google Sheets
- Airtable
- Notion
- Slack alerts
- AI summarization tools
- RAG pipelines and vector databases

Example API run:

```bash
curl "https://api.apify.com/v2/acts/esrok~substack-publication-and-post-scraper/runs?token=YOUR_APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "publicationUrls": ["https://astralcodexten.substack.com"],
    "maxPostsPerPublication": 10,
    "includePostText": true
  }'
```

Read dataset items after the run finishes:

```bash
curl "https://api.apify.com/v2/datasets/DATASET_ID/items?format=json&clean=true&token=YOUR_APIFY_TOKEN"
```

## Responsible use

Use this Actor only for public research, content monitoring, and analysis of publicly visible Substack pages.

Do not use it to bypass paywalls, access paid subscriber-only content, collect private user data, scrape login-only pages, or violate Substack's terms or creator rights.

The Actor does not use login sessions, cookies, or subscriber accounts. It reads public RSS feeds and public post pages. If a paid post exposes only a preview, the Actor returns only that public preview and marks `accessStatus` as `preview_only`.

## Limitations

- The Actor only collects data visible on public pages or public RSS feeds.
- It does not access paid subscriber-only content, private content, drafts, login-only comments, or hidden private APIs.
- RSS feeds may include only recent posts, depending on the publication.
- Some fields are `null` when Substack or the publication does not expose them publicly.
- Likes and comments counts are returned only when visible and parseable from the public page.
- Custom-domain Substacks are supported when they expose a standard public RSS feed and public post pages.
- Very large `publicPostText` fields can make CSV and Excel exports heavier.
- Keyword search and Substack discovery are not included in this version.

## FAQ

### Does this Actor bypass Substack paywalls?

No. It only reads public pages and public RSS feeds. Paid or preview-only posts are marked as `preview_only`, and only visible preview text is returned.

### Does it require a Substack login?

No. The Actor does not use login sessions, cookies, or subscriber accounts.

### Can I scrape direct post URLs?

Yes. Put direct public post URLs in `postUrls`. You can use `publicationUrls`, `postUrls`, or both.

### Can I collect full public article text?

Yes. Enable `includePostText`. The Actor returns public article text when the post is publicly readable. If the post is preview-only, it returns only the public preview text.

### Can I use this for AI summaries?

Yes. Enable `includePostText` and send `publicPostText`, `postTitle`, `authorName`, `publicationName`, and `postUrl` into your AI workflow.

### Can I use this for RAG pipelines?

Yes. The output is structured JSON, so public post text and metadata can be loaded into vector databases, internal search tools, and retrieval workflows.

### Why are some fields null?

Substack does not expose every field on every public page. The Actor returns `null` instead of guessing.

### Can I export to Google Sheets?

Yes. Use Apify dataset export, Apify integrations, Make, Zapier, n8n, or the Apify API.

### How do I monitor new posts?

Create an Apify schedule and process only new dataset rows in your downstream automation. You can also use date filters to limit each run to a recent time window.

### Does it search Substack by keyword?

Not in this version. This Actor currently accepts publication URLs and post URLs. Keyword search and publication discovery are good candidates for a future version.
