# Apify Store launch sheet

This file captures the exact launch settings for `esrok/substack-publication-and-post-scraper`.

## Current deployed Actor

- Actor: `esrok/substack-publication-and-post-scraper`
- Actor ID: `kdADonDMGZ5jUPcRj`
- Latest build: `1.0.4`
- Console URL: `https://console.apify.com/organization/PsRG5Th2xygCZgJxh/actors/kdADonDMGZ5jUPcRj`
- GitHub URL: `https://github.com/ChielSlotman/substack-publication-and-post-scraper`
- Public Store URL: `https://apify.com/esrok/substack-publication-and-post-scraper`

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

Configured launch pricing:

```text
Pricing model: Pay per event
Event name: public-post-result
Event title: Public post result
Price: $0.0025 per result
Buyer framing: $2.50 per 1,000 public post results
Primary event: public-post-result
Actor start event: apify-actor-start at $0.00005
Platform usage charged separately to users: no
```

The code calls `Actor.pushData(finalResults, 'public-post-result')`, so Apify charges one `public-post-result` event per pushed dataset row. The automatic default dataset item event was removed from pricing to avoid double-charging dataset rows.

## Responsible use position

Use this positioning consistently in the Store copy and support replies:

```text
This Actor extracts publicly visible Substack publication and post information for research, content monitoring, and analysis. It does not log in, bypass paywalls, scrape paid subscriber-only content, collect private user data, or access login-only pages. Paid or preview-only posts are returned only with publicly visible preview data and are marked as preview_only.
```

## Publication status

Monetization is active in Apify Console as of 2026-05-29.

- Pricing model: Pay per event
- Primary event: `public-post-result`
- Public post result price: `$0.0025`
- Actor start event: `apify-actor-start` at `$0.00005`
- Published on Apify Store.
- Public Store URL: `https://apify.com/esrok/substack-publication-and-post-scraper`

## Post-publish verification

1. Verify the public Store page:
   `https://apify.com/esrok/substack-publication-and-post-scraper`
2. Run the Store Actor once from the public page and confirm the dataset has public Substack rows.
3. Confirm the public README does not include internal launch notes or builder-only checklists.

## Last verified smoke test

Post-publish API smoke test passed on build `1.0.4`.

- Run: `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/VQ64WOJxZF0X4KMDl`
- Dataset: `https://console.apify.com/storage/datasets/gkN7xNYhC4HYej9bc`
- Result status: `SUCCEEDED`
- Public rows pushed: `1`
- First result: `Book Review: The Dialectical Imagination`
- Access status: `public`

Cloud smoke test passed with 2 dataset rows using `examples/local-smoke-input.json`.

- Run: `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/aKEY7iaz6vLs316tk`
- Dataset: `https://console.apify.com/storage/datasets/QUvbD883hv9PtL5U1`
- Build: `1.0.3`
- Result status: `partial`
- Public rows pushed: `2`
- Preview-only rows: `1`
- Unavailable rows: `0`

GitHub CI passed after adding the validation workflow.

- Workflow run: `https://github.com/ChielSlotman/substack-publication-and-post-scraper/actions/runs/26656523996`

## API verification runs

The Actor was tested three times through the Apify API with small public inputs.

| Test | Run | Dataset | Result |
| --- | --- | --- | --- |
| Publication URL, no post text | `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/nWLxA0DxLA5ECLlV8` | `https://console.apify.com/storage/datasets/84aGlIle7i2H0SGAd` | `SUCCEEDED`, 1 item, `RUN_SUMMARY.status=ok` |
| Direct post URL, no post text | `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/6wW8oFE29joDsKyBJ` | `https://console.apify.com/storage/datasets/Fb0F3XY6ZgQpLNefn` | `SUCCEEDED`, 1 item, `RUN_SUMMARY.status=ok` |
| Publication URL, post text enabled | `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/TwqGB6oOgAleuRMVg` | `https://console.apify.com/storage/datasets/JAG0LeVX5NPd1dxRd` | `SUCCEEDED`, 1 item, `publicPostText` returned 52,635 characters |
