# Listing proof

Last verified: 2026-05-29 21:19 CEST

This file records the current proof that the Actor and Store listing are prepared for publication. It is intentionally separate from the marketing copy so it can be used as a launch evidence sheet.

## Actor identity

- Actor ID: `kdADonDMGZ5jUPcRj`
- Actor slug: `esrok/substack-publication-and-post-scraper`
- Actor title: `Substack Publication and Post Scraper`
- Console publication URL: `https://console.apify.com/organization/PsRG5Th2xygCZgJxh/actors/kdADonDMGZ5jUPcRj/publication`
- Expected public Store URL after publication: `https://apify.com/esrok/substack-publication-and-post-scraper`
- GitHub repository: `https://github.com/ChielSlotman/substack-publication-and-post-scraper`

## Console listing proof

The Apify Console publication page was inspected in the in-app browser at:

```text
https://console.apify.com/organization/PsRG5Th2xygCZgJxh/actors/kdADonDMGZ5jUPcRj/publication
```

Visible/saved listing state:

- Page title: `Substack Publication and Post Scraper`
- Current status badge: `Private`
- Actor slug shown: `esrok/substack-publication-and-post-scraper`
- Display information section states: `This information will be shown in Apify Store.`
- Store title field: `Substack Publication and Post Scraper`
- Store description field:

```text
Extract public Substack posts, authors, publication details, dates, URLs, excerpts, images, tags, visible engagement counts, and public article text for research, competitor tracking, market analysis, and AI workflows. No login and no paywall bypass.
```

- Categories saved: `SOCIAL_MEDIA`, `NEWS`, `AI`
- Source files hidden from Actor detail: enabled
- Custom SEO details: enabled
- SEO title field: `Substack Publication and Post Scraper`
- SEO description field:

```text
Scrape public Substack posts, authors, publication data, dates, excerpts, URLs, and article text. Export newsletter data for research and AI workflows.
```

- `Save` button state: disabled, which indicates the currently visible listing values are already saved.
- `Publish on Store` button: visible.

## Publication status

The Actor is not public yet. This is expected and intentional because monetization is still blocked by organization account setup.

Known publication blocker:

```text
Billing details and payment method are not set for the Apify organization, so monetization cannot be configured yet.
```

Do not publish the Actor as a free Actor first. The Apify publish dialog warns that paid monetization changes added after publishing can take 14 days to become effective.

## GitHub visibility proof

The GitHub repository is public and already positioned for discovery.

- Repository: `ChielSlotman/substack-publication-and-post-scraper`
- Visibility: public
- GitHub URL: `https://github.com/ChielSlotman/substack-publication-and-post-scraper`
- Repository description:

```text
Apify Actor for scraping public Substack publication, author, and post data for research, monitoring, and AI workflows.
```

- Repository homepage:

```text
https://console.apify.com/organization/PsRG5Th2xygCZgJxh/actors/kdADonDMGZ5jUPcRj
```

- Repository topics:

```text
ai-workflows, apify, apify-actor, competitor-research, content-research, market-research, newsletter-scraper, nodejs, substack, substack-scraper, web-scraping
```

## API run proof

The Actor was tested three times through the Apify API with small public inputs.

| Test | Run | Dataset | Result |
| --- | --- | --- | --- |
| Publication URL, no post text | `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/nWLxA0DxLA5ECLlV8` | `https://console.apify.com/storage/datasets/84aGlIle7i2H0SGAd` | `SUCCEEDED`, 1 item, `RUN_SUMMARY.status=ok` |
| Direct post URL, no post text | `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/6wW8oFE29joDsKyBJ` | `https://console.apify.com/storage/datasets/Fb0F3XY6ZgQpLNefn` | `SUCCEEDED`, 1 item, `RUN_SUMMARY.status=ok` |
| Publication URL, post text enabled | `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/TwqGB6oOgAleuRMVg` | `https://console.apify.com/storage/datasets/JAG0LeVX5NPd1dxRd` | `SUCCEEDED`, 1 item, `publicPostText` returned 52,635 characters |

Additional cloud smoke test:

- Run: `https://console.apify.com/actors/kdADonDMGZ5jUPcRj/runs/aKEY7iaz6vLs316tk`
- Dataset: `https://console.apify.com/storage/datasets/QUvbD883hv9PtL5U1`
- Build: `1.0.3`
- Dataset rows: `2`
- Result status: `partial`
- Preview-only rows: `1`
- Unavailable rows: `0`

## CI proof

GitHub Actions validation exists and has passed for the production repository.

- Workflow run: `https://github.com/ChielSlotman/substack-publication-and-post-scraper/actions/runs/26656523996`
- Validation commands: `npm run lint`, `npm test`

## Launch proof summary

The code, README, input schema, output schema, Store copy, SEO fields, categories, GitHub repository metadata, and API smoke runs are ready for Store publication.

The remaining publication action is account-level, not code-level:

1. Add Apify organization billing details and payment method.
2. Configure pay-per-event monetization with event `public-post-result`.
3. Publish the already prepared listing on Apify Store.
