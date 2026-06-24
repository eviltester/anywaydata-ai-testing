# Defect 004: Site Blog Listing Renders Frontmatter As Visible Article Content

## Summary

The nested site blog listing currently renders frontmatter-like metadata as visible article content for the first listed post instead of presenting clean blog copy.

## Surface

- `https://eviltester.github.io/grid-table-editor/site/blog`

## Why This Matters

- This is a user-visible content defect on the deployed nested site.
- It reduces trust in the merged `/site/` publishing surface that PR #234 touches through shared site/testenv build behavior.
- It suggests at least one blog entry is being rendered from malformed or unprocessed content.

## Repeatability

- Observed directly and repeatably in this session on the current deployed blog listing page.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/site/blog`.
2. Inspect the first listed post on the page.

## Observed

The first visible entry shows a heading-like block containing frontmatter-style text:

- `slug: combinatorial-grid-workflows authors: [alan] tags: [release, feature, combinatorial, schema, import, export, ux] date: 2026-06-12T10:00`

This appears in the public article preview instead of normal post content.

## Expected

- Blog listing previews should render article title, summary, author/date, and normal body excerpt content.
- Frontmatter metadata should not be exposed as visible article content.

## Evidence

- Loop 2 live browser observation on `site/blog`
- Main log: [../issue-233-test-log.md](../issue-233-test-log.md)

## Notes For Investigation

- Compare this post with other blog entries on the same page, which appear to render more normally.
- Check whether the issue is specific to a single post file or a broader markdown/frontmatter rendering problem in the nested site pipeline.
