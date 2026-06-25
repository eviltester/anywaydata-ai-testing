# Docs/Help/Content Consistency Retest Log

---
## 2026-06-25T00:55:00+01:00

### Charter

Docs/help/content consistency across app and published docs for issue #228 / PR #243. Compare the deployed public docs, in-app/generator help, picker examples, and practical runtime behavior for changed command families. Focus areas: `datatype.enum` aliases, named `values` params, raw comma examples, hidden/disallowed faker helpers, stale `generate.html` vs `generator.html` links, and examples that no longer match runtime.

### Environment And Constraints

- Deployed environment only: `https://eviltester.github.io/grid-table-editor/`.
- Deployment metadata observed from the existing issue log and landing page: branch `codex/228-improve-command-definition`, commit `a3b39ddcfe0f`, built `2026-06-24T23:03:43.621Z`.
- Did not run local verify/build/package-manager/repo test commands.
- Browser automation: attempted Playwright MCP first, but the MCP bridge failed to attach with `Invalid URL: undefined`; switched to Chrome DevTools Protocol against the deployed site.
- HTTP checks used only public deployed pages/assets.

### Techniques And Heuristics

- Link consistency checks between public docs and deployed routes.
- Documentation example testing against current runtime.
- Cross-surface oracle comparison: public docs text, in-app/generator help text, command picker options, params dialog behavior, schema text serialization, and generated preview output.
- Alias equivalence partitioning for enum spellings.
- Negative/permission-oriented checks for helper-only faker commands in domain vs faker contexts.
- Retest against prior artifact folder to avoid duplicating stale findings.

### Pages And Assets Reviewed

- `https://eviltester.github.io/grid-table-editor/`
- `https://eviltester.github.io/grid-table-editor/app.html`
- `https://eviltester.github.io/grid-table-editor/generator.html`
- `https://eviltester.github.io/grid-table-editor/generate.html`
- `https://eviltester.github.io/grid-table-editor/site/`
- `https://eviltester.github.io/grid-table-editor/site/app.html`
- `https://eviltester.github.io/grid-table-editor/site/generator.html`
- `https://eviltester.github.io/grid-table-editor/site/generate.html`
- `https://eviltester.github.io/grid-table-editor/site/docs/intro`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/test-data-generation`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/generate-to-file`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/datatype/`
- `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
- Deployed JS assets sampled: `generator-8qkDmNIq.js`, `generator-script-qDlNeETi.js`, `domain-command-provider-DnyhZrzJ.js`, `schema-conversion-CGLqX1_q.js`, `app-CThAVrql.js`, `script-DIr1JVbM.js`.

### Examples Tried

- `status` / `datatype.enum(values="active,inactive,pending")` in generator text mode.
- `status` / `enum("active","inactive","pending")`.
- `status` / `enum active,inactive,pending`.
- `status` / `active,inactive,pending`.
- `status` / `"active","inactive","pending"`.
- `status` / `awd.datatype.enum("active","inactive","pending")`.
- `status` / `datatype.enum(active,inactive,pending)`.
- Row-mode domain command picker: selected `datatype.enum`, opened params dialog, entered `active,inactive,pending`, applied params.
- Domain picker filtering: searched domain options for `datatype.enum`, `helpers.*`, `faker.helpers.*`, and `arrayElement`.
- Faker picker filtering: searched faker options for helper entries.
- Published faker docs examples:
  - `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `faker.helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")`
  - `helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })`
- Domain misuse check: `domain.helpers.fake("Hi")`.

### Consistency Observations

- `generator.html` works at both root and nested site paths; `generate.html` returns `404` at both root and nested site paths.
- Public datatype docs are live at `/site/docs/test-data/domain/datatype/`.
- Public datatype docs describe `datatype.enum(values="...")`, `enum("...")`, `enum value1,value2`, raw comma lists, quoted raw comma lists, and `awd.datatype.enum(...)` compatibility.
- Runtime generated values successfully for all sampled enum forms above. The raw comma run sampled only two of three values in 10 preview rows, but that is compatible with random sampling rather than a defect.
- The row-mode domain picker includes `datatype.enum`.
- The `datatype.enum` params dialog:
  - Opens with command label `awd.domain.datatype.enum`.
  - Shows `values` as a required checkbox in the Req column.
  - Keeps Apply disabled until a value is entered.
  - Applies entered values as `enum(active,inactive,pending)` in the public schema text, matching the intended public/internal normalization split.
- Domain command picker hides faker helper-only commands: no `helpers.arrayElement`, `faker.helpers.*`, or other `helpers.*` entries appeared in domain options.
- Faker picker intentionally exposes helper commands, including `helpers.fake`, `helpers.mustache`, and `helpers.arrayElement`.
- Domain docs explicitly say `helpers.*` is faker-only and `domain.helpers.fake(...)` is invalid.
- Runtime rejects `domain.helpers.fake("Hi")` with visible guidance: `helpers.* is faker-only; use faker.helpers.*` plus an unknown domain command message.
- `helpers.fake(...)` and `faker.helpers.fake(...)` examples from faker docs generate expected names in runtime.
- The previously filed `issue-228-generator-text-mode-enum-does-not-preview.md` was not reproduced for the enum text-mode cases sampled in this pass on the same deployed commit.

### Defects Filed

- `defects/docs-still-reference-generate-html.md`
- `defects/faker-docs-helpers-mustache-example-rejected.md`

### Defects

#### Medium: Published docs still describe `generate.html`, but deployed route is `generator.html`

Confirmed on public docs pages:

- `/site/docs/test-data/test-data-generation`
- `/site/docs/test-data/generate-to-file`
- `/site/docs/test-data/Schema-Definition`

Observed examples include visible headings/text such as `Generate to File (generate.html)`, page metadata saying `Use generate.html`, and schema-definition text saying the schema editor is in `app.html` and `generate.html`. Root and nested `generate.html` routes return 404, while `generator.html` routes return 200.

#### Medium: Published `helpers.mustache` faker example is rejected by deployed runtime

The public faker docs show:

```txt
helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })
```

When entered in deployed generator text mode, preview output stays empty and the visible error says the faker params are invalid because unsafe faker rule syntax requires complex argument parsing. This makes the published example unusable as written.

### Deferred Items

- I did not exhaustively click every docs sidebar entry or every helper command. This pass focused on the changed command families called out in the charter.
- I did not verify screenshots because CDP text/DOM/runtime evidence was sufficient for these content consistency defects.
- I did not retest app embedded generation deeply beyond public app shell/link/bundle checks because the charter emphasis was docs/help/content consistency and generator command examples.
- I did not edit the pre-existing text-mode enum defect even though the sampled enum text-mode cases now work; leaving that for the parent retest owner to reconcile against their exact steps/screenshot.

### New Ideas

- Add an automated deployed-docs link check that fails on `generate.html` references unless explicitly grandfathered.
- Add a docs-example smoke runner that extracts code blocks from `datatype` and `faker-test-data` docs and previews/generates one row in the deployed generator.
- Split faker helper docs into safe UI-supported examples vs full Faker API examples that require complex JavaScript callbacks.
- In the faker picker, mark helpers that are exposed but likely constrained by safe parser support, or link to a docs section explaining the supported argument subset.
- Add a docs note near `helpers.mustache` if callback/object-literal arguments are intentionally unsupported in browser schema text.
- Add a small in-app help text check to ensure help links point to public docs routes that return 200.
- Preserve an explicit docs term map: public page name `Generate to File`, route `generator.html`, schema mode names, and app labels.
- Add a regression test for domain picker filtering that verifies `datatype.enum` appears while `helpers.*` does not.
- Add a regression test for faker picker filtering that verifies intended helper commands appear only in faker context.
- Reconcile the pre-existing text-mode enum defect against the current behavior; if fixed, mark as resolved in the parent report.
