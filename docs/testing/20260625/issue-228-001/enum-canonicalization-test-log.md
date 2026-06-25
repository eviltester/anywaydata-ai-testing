# Enum Canonicalization Retest Log

Date: 2026-06-25
Environment: https://eviltester.github.io/grid-table-editor/
Charter: Retest the PR #243 changed enum surface for alias/canonicalization and schema round-trip behavior across `generator.html` and `app.html`, focusing on `datatype.enum`, enum aliases, raw comma values, `enum(...)` forms, named values parameters, generated output, help text, saved/exported schema representation, imported schema representation, and whether the UI normalizes or preserves values consistently.

## Techniques And Heuristics

- Equivalence partitioning across enum spellings: raw comma values, `enum(...)`, `datatype.enum(...)`, and alias-style forms where discoverable.
- Round-trip testing: enter schema/value, sync or save/export, reload/import, and compare visible representation.
- Cross-surface consistency: compare generator and app behavior for the same enum specs.
- Oracle checks from visible output: verify generated rows use only declared enum values and inspect whether schema text remains public-facing.
- Error-seeking inputs: values containing commas, whitespace, mixed case, and named `values=` parameter forms.
- Documentation/help comparison: compare help text and UI labels with observed accepted syntax.

## Test Matrix

| ID | Surface | Input/Action | Expected Oracle | Status | Evidence/Notes |
| --- | --- | --- | --- | --- | --- |
| M1 | generator.html | Raw comma enum values | Generated values limited to declared set; saved/schema UI behavior noted | Covered | Generated constrained values; save normalized to `enum(...)`. |
| M2 | generator.html | `enum(...)` public form | Accepted and preserved in public schema text where applicable | Covered | Generated constrained values; saved as public `enum(...)`. |
| M3 | generator.html | `datatype.enum(...)` canonical form | Accepted for runtime generation; public UI does not leak confusing internal spelling unless intentionally documented | Covered | Accepted for generation; save/switch normalized to public `enum(...)`. |
| M4 | generator.html | Named `values=` parameter form | Either accepted consistently or rejected with clear help/error | Covered | `datatype.enum(values="...")` and `enum(values="...")` both generated declared values. |
| M5 | app.html | Schema grid/text entry with enum forms | UI syncs without stale `domain`/`enum` mismatch and preserves/normalizes consistently | Covered | No stale mismatch or sync recursion observed. |
| M6 | app.html | Export/save then import/load schema | Round-trip representation is stable and generated output remains constrained | Covered | Imported raw comma and `datatype.enum(values="...")`; saved as public `enum(...)`. |
| M7 | Public help/docs | Enum syntax help | Help documents accepted public syntax and does not contradict UI behavior | Covered | In-app help and datatype docs align with sampled accepted syntax. |
| M8 | Cross-surface | Same enum specs in generator and app | Same values generated from same logical enum spec | Covered | Raw comma, `enum(...)`, `datatype.enum(...)`, named `values=`, and `awd.datatype.enum(...)` behaved consistently. |
| M9 | generator.html | Documented aliases: `enum value1,value2`, quoted lists, `awd.datatype.enum(...)`, `awd.domain.datatype.enum(...)` | Accepted or clearly rejected in line with docs | Covered | Documented aliases generated declared values; sampled aliases normalized on save. |

## Sequential Log

- 2026-06-25 00:10 Europe/London: Started retest as deployed-environment-only subagent. Constraints confirmed: no local verify/build/package-manager/repo test commands; only deployed site and public pages/docs; artifact writes only under requested QA folder.
- 2026-06-25 00:12 Europe/London: Memory context reviewed. Important oracle: internal/runtime canonicalization may use `datatype.enum(...)`, while public schema text should round-trip as `enum(...)`; prior failure mode to watch for is `Expected: "enum" Received: "domain"` or schema sync recursion.
- 2026-06-25 00:14 Europe/London: Proved deployed browser access by opening `https://eviltester.github.io/grid-table-editor/generator.html`, clicking the page, reading title `Data Generator - AnyWayData`, and saving screenshot `screenshots/enum-proof-generator.png`.
- 2026-06-25 00:16 Europe/London: Scouted `generator.html`. Visible surfaces include schema grid/text toggle, schema file load/save, enum/literal/regex/domain/faker source type selector, schema constraints, managed stored schemas, generate data, generate combinations, settings, preview, output preview, and data-table preview.
- 2026-06-25 00:18 Europe/London: Ran generator text-mode preview cases: raw comma `open,closed,pending`, public `enum(open,closed,pending)`, internal `datatype.enum(open,closed,pending)`, `datatype.enum(values="open,closed,pending")`, and `enum(values="open,closed,pending")`.
- 2026-06-25 00:20 Europe/London: Generator output for all five base cases used only the declared `open`, `closed`, and `pending` values. No validation messages or stale `domain`/`enum` mismatch appeared.
- 2026-06-25 00:22 Europe/London: Ran generator representation cases by switching text input to schema/grid mode and saving schema. `enum(...)`, `datatype.enum(...)`, `datatype.enum(values="...")`, and raw comma forms all mapped to grid source type `enum`, grid value `open,closed,pending`, and saved as `Status\nenum(open,closed,pending)`.
- 2026-06-25 00:24 Europe/London: Proved `app.html` access by opening `https://eviltester.github.io/grid-table-editor/app.html`, clicking the page, reading title `Test Data Generator and Table Editor for Markdown, CSV, JSON, Gherkin and HTML - AnyWayData`, and saving screenshot `screenshots/enum-proof-app.png`.
- 2026-06-25 00:26 Europe/London: Scouted `app.html`. Relevant surfaces include collapsed Test Data details, generation rows/mode controls, schema grid/text toggle, schema file load/save, grid-to-enum schema generation, import/export preview, grid sync buttons, and data grid output.
- 2026-06-25 00:28 Europe/London: Initial app fill attempt correctly exposed that the schema textarea is hidden while Test Data details are collapsed. Opened `details[data-role="test-data-details"]` and then used the visible schema mode toggle for the real user path.
- 2026-06-25 00:31 Europe/London: Ran app generation and representation cases for public `enum(...)`, `datatype.enum(...)`, raw comma, and `datatype.enum(values="...")`. Each generated 10 grid rows using only declared values and mapped back to schema grid source type `enum` with value `open,closed,pending`.
- 2026-06-25 00:33 Europe/London: App schema save/switch behavior normalized `datatype.enum(...)`, raw comma, and named-values inputs to public `Status\nenum(open,closed,pending)`, matching generator behavior.
- 2026-06-25 00:35 Europe/London: Added import fixtures `import-datatype-enum.schema` and `import-raw-comma.schema` in the QA folder. Imported both into generator and app using the visible Load Schema File control.
- 2026-06-25 00:37 Europe/London: Imported schema observations: both generator and app initially showed the imported source text in the schema text area, parsed it into grid source type `enum` with value `open,closed,pending`, and saved back out as `Status\nenum(open,closed,pending)`.
- 2026-06-25 00:39 Europe/London: Help/docs pass. In-app enum help says comma-separated enum values, `enum active,inactive,pending`, params field `values`, and example `enum active,inactive,pending`. Public datatype docs mention `enum(value1,value2)`, `enum value1,value2`, `datatype.enum(value1,value2)`, raw comma lists, quoted lists, named `values=`, `awd.datatype.enum(...)`, and canonical `awd.domain.datatype.enum`.
- 2026-06-25 00:42 Europe/London: Alias generation pass in generator: `enum open,closed,pending`, `"open","closed","pending"`, `enum("open","closed","pending")`, `awd.datatype.enum(open,closed,pending)`, and `awd.domain.datatype.enum(open,closed,pending)` all generated only declared values with no messages.
- 2026-06-25 00:44 Europe/London: Alias representation pass: `enum open,closed,pending` and `awd.datatype.enum(open,closed,pending)` mapped to schema grid source type `enum`, value `open,closed,pending`, and saved/switch-normalized to `Status\nenum(open,closed,pending)` in generator. `awd.datatype.enum(...)` behaved the same in app.
- 2026-06-25 00:46 Europe/London: Quoted comma-in-value probe: `City\nenum("New York, NY","Paris")` generated only `New York, NY` and `Paris`; grid value became `"New York, NY",Paris`; saved schema became `City\nenum("New York, NY",Paris)`. This is acceptable based on observed generation and parser preservation of the value containing a comma, but worth broader follow-up for quote-style preservation expectations.

## Observations

- Browser proof and screenshots are stored under `screenshots/`, including `enum-proof-generator.png`, `enum-proof-app.png`, generator/app case screenshots, import screenshots, and docs screenshots.
- Generator accepts raw comma enum values, public `enum(...)`, internal `datatype.enum(...)`, named `values=`, `enum value1,value2`, quoted lists, and documented `awd.*.enum(...)` aliases.
- App accepts the sampled raw comma, public `enum(...)`, internal `datatype.enum(...)`, named `values=`, and `awd.datatype.enum(...)` forms when Test Data details are opened and schema text mode is used.
- Generated output stayed within declared enum values across generator preview and app grid generation. No observed output included command names, parameter wrappers, or split artifacts for the sampled normal cases.
- Public representation is stable after schema-grid sync/save: sampled aliases and internal forms normalize to `enum(open,closed,pending)` rather than leaking `datatype.enum(...)`.
- Imported schema behaves consistently with typed schema: imported raw comma and `datatype.enum(values="...")` parse into enum grid controls and save as public `enum(...)`.
- In-app help and public datatype docs are broadly aligned with runtime behavior for enum aliases and named `values=`.
- The guessed public docs URL `site/docs/test-data/schema` returned GitHub Pages 404, but this was a tester-discovered guessed URL, not a linked product URL in this pass.

## Findings

- No confirmed enum canonicalization defects found in this gap charter.
- No defect markdown files were created because all observed behaviors were consistent with the current oracle or were deferred as follow-up risks rather than confirmed defects.

## Coverage

- M1 `generator.html` raw comma values: Covered. Generated values were constrained and schema save normalized to `enum(...)`.
- M2 `generator.html` public `enum(...)`: Covered. Generated values were constrained and schema save preserved public `enum(...)`.
- M3 `generator.html` `datatype.enum(...)`: Covered. Accepted for generation and normalized to public `enum(...)` on schema save/switch.
- M4 `generator.html` named `values=`: Covered for `datatype.enum(values="...")` and `enum(values="...")`. Both generated declared values; `datatype.enum(values="...")` normalized to `enum(...)`.
- M5 `app.html` schema grid/text entry: Covered. No stale `domain`/`enum` mismatch, recursion, or validation message observed.
- M6 `app.html` export/import schema: Covered through schema file import/save for raw comma and `datatype.enum(values="...")`.
- M7 public help/docs: Covered for in-app enum help and public datatype docs. The docs support the accepted alias set.
- M8 cross-surface consistency: Covered for raw comma, `enum(...)`, `datatype.enum(...)`, named `values=`, and `awd.datatype.enum(...)`.
- M9 documented aliases: Covered on generator for `enum value1,value2`, quoted lists, `awd.datatype.enum(...)`, and `awd.domain.datatype.enum(...)`; covered on app for `awd.datatype.enum(...)`.

## Deferred Ideas

- Broaden quote-style preservation checks for enum values containing commas. Current probe generated correct values, but save normalized `enum("New York, NY","Paris")` to `enum("New York, NY",Paris)`.
- Test `awd.domain.datatype.enum(...)` in `app.html` as well as generator; generator passed, and app passed the shorter `awd.datatype.enum(...)` alias.
- Exercise Generate Combinations/n-wise with mixed enum aliases on both surfaces, especially two enum columns authored with different spellings.
- Repeat import/export with multi-column schemas mixing enum aliases, constraints, and non-enum domain/faker fields.
- Check whether stored schema history preserves the same public normalization as file save/load.
