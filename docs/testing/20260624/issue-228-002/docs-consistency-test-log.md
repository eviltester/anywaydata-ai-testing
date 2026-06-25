# Docs Consistency Test Log

---
## 2026-06-24T21:31:00.0000000+01:00

- Charter: compare published docs, in-app help, method-picker/spec content, and live runtime behavior for command families exposed on the current deployed branch.

Techniques and heuristics to use: documentation testing, consistency/oracle checking, stale-content hunting, and representative example execution.

Expected focus: docs links, examples, removed commands, missing commands, stale wording, and mismatches between what docs/help/specs claim and what the deployed runtime actually exposes or accepts.

---

---
## 2026-06-24T21:34:50.0000000+01:00

- Prove I can inspect the deployed help and docs surfaces for this lane, then gather the specific runtime help-link targets and published pages that appear most affected by the command-definition consolidation in issue #228 / PR #243.

I read the issue statement at https://github.com/eviltester/grid-table-editor/issues/228 to anchor the review around merged command definitions and docs/help maintenance risk. I attempted the in-app browser route first, found that the `iab` browser surface was unavailable in this session, and switched to the allowed Playwright CLI path instead. I verified browser tooling with `npx --yes --package @playwright/cli playwright-cli --help`, opened the deployed generator at https://eviltester.github.io/grid-table-editor/generator.html in a headed session, and captured live snapshots while switching the generator row type between `regex`, `enum`, `domain`, and `faker`. I expanded the top-level generator help and the schema help tooltip to inspect in-app wording and documentation links. I also fetched the published docs HTML for these pages for direct comparison: `site/docs/category/generating-data`, `site/docs/test-data/test-data-generation`, `site/docs/test-data/regex-test-data`, `site/docs/test-data/faker-test-data`, `site/docs/test-data/faker/helpers`, `site/docs/test-data/domain/domain-test-data`, and `site/docs/test-data/domain/datatype`.

The deployed runtime is inspectable and the docs/help surfaces are live. The runtime help-link targets I confirmed were: `Regex data help -> /site/docs/test-data/regex-test-data`, `Domain data help -> /site/docs/test-data/domain/domain-test-data`, `Faker data help -> /site/docs/test-data/faker-test-data`, and `Enum data help -> /site/docs/category/generating-data`. The generator instruction tooltip links to `Generate To File docs`, and the schema tooltip also links to `Generate To File docs`. Techniques used in this pass: documentation testing, consistency/oracle checking, stale-content hunting, and representative surface sampling across runtime help, category docs, command-family docs, and a changed domain page.

---

---
## 2026-06-24T21:39:40.0000000+01:00

- Compare the runtime-exposed command/help surfaces against the published docs in enough detail to identify stale links, missing command coverage, naming drift, and likely follow-up ideas for later loops.

I compared the runtime row-type picker and help links in `generator.html` with the published docs pages and examples. I used the live runtime snapshot to confirm the faker command list includes `helpers.arrayElement`, `helpers.arrayElements`, `helpers.enumValue`, `helpers.fake`, `helpers.fromRegExp`, `helpers.maybe`, `helpers.multiple`, `helpers.mustache`, `helpers.objectEntry`, `helpers.objectKey`, `helpers.objectValue`, `helpers.rangeToNumber`, `helpers.replaceCreditCardSymbols`, `helpers.replaceSymbols`, `helpers.shuffle`, `helpers.slugify`, `helpers.uniqueArray`, and `helpers.weightedArrayElement`. I then searched the published Faker Helpers page for `enumValue`, `objectEntry`, `objectKey`, and `objectValue`, and found all four absent. I fetched `site/docs/test-data/test-data-generation` and checked its data-type list against the live generator row-type picker. I also checked the published workflow naming against deployed runtime URLs by requesting both `https://eviltester.github.io/grid-table-editor/generate.html` and `https://eviltester.github.io/grid-table-editor/generator.html`. For evidence screenshots, I saved `screenshots/enum-help-link.png` showing the live enum row/help state and `screenshots/faker-commands-runtime.png` showing the live faker command list state.

The main comparisons and findings from this pass are:

1. Confirmed mismatch: live `Enum data help` points to the broad category page `site/docs/category/generating-data` instead of a command-specific enum reference. This is notable because the published docs now contain a dedicated `datatype.enum` reference on `site/docs/test-data/domain/datatype`, but the in-app enum help does not take the user there. This looks like stale or insufficiently specific help wiring after the command-definition consolidation.

2. Confirmed mismatch: the published `Test Data Generation` page says the two web UI workflows are `app.html` and `generate.html`, but the deployed review environment serves the generator workflow at `generator.html`. I verified `generate.html` returns `404` while `generator.html` returns `200`. This is a repeatable naming drift between docs/help wording and the deployed environment.

3. Confirmed coverage gap: the live faker command picker exposes `helpers.enumValue`, `helpers.objectEntry`, `helpers.objectKey`, and `helpers.objectValue`, but the published `site/docs/test-data/faker/helpers` page does not document those commands at all. Given issue #228 is explicitly about merged command definitions/help maintainability, this is an important documentation completeness miss rather than a cosmetic omission.

4. Confirmed wording gap: `site/docs/test-data/test-data-generation` lists supported rule types as `Literal`, `RegEx`, `Faker`, and `Enum`, but omits `Domain` from that summary list even though the live generator row-type picker exposes `domain` as a first-class rule type and the page later links to `Domain Test Data`. This creates an avoidable inconsistency in the high-level docs.

5. Cross-surface note: `Domain data help` and `Faker data help` both route to reasonably specific landing pages, while `Enum data help` routes to a generic category page. The help-link specificity is inconsistent across adjacent command families.

6. Cross-surface note: the schema help tooltip is focused on switching to text mode and links to `Generate To File docs`, but it does not surface the newer enum/domain/faker command-family reference pages directly. This may be intentional, but it still leaves the enum path less discoverable than the dedicated docs now available.

New ideas to hand back to the main agent:

- Execute-now candidate: open the `datatype` domain docs page in-browser and compare its `datatype.enum` examples with live enum authoring formats such as raw `a,b,c`, quoted values, and `datatype.enum(values="...")`.
- Execute-now candidate: inspect whether the app-side help for `domain` and `faker` parameter editing points users toward the right docs when a command requiring structured params is selected.
- Execute-now candidate: compare the published `generate-to-file` page wording with the actual browser page title and navigation labels to see how widespread the `generate.html` vs `generator.html` drift is.
- Execute-now candidate: check whether the site search/sidebar taxonomy exposes enum-specific docs anywhere discoverable from the Generating Data category, or only indirectly through the `datatype` domain page.
- Defer candidate: inspect whether blog posts or video/tutorial pages still use removed or old command forms like `domain.helpers.*`.
- Defer candidate: compare Storybook or method-picker-related docs/spec text against the live app help taxonomy to see whether the same naming/help inconsistencies recur outside generator docs.

Overall assessment for this lane so far: documentation and help have improved breadth in the published site, especially for `datatype.enum` and faker helpers, but the deployed help wiring and overview pages have not fully caught up. The most important repeatable issues are enum help pointing to a generic page, the `generate.html` naming/404 drift, and missing docs for runtime-exposed faker helper commands.

---
