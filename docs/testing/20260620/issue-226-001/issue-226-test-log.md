## 2026-06-20 17:03 +01:00

- Establish the exploratory charter, anchor it to issue #226 and PR #231, and create the sequential evidence log before interacting with the deployed test environment.

Actions taken:
- Reviewed the issue statement for #226.
- Reviewed PR #231 summary and changed-file list to understand the primary risk areas.
- Confirmed the deployed target for exploratory testing is `https://eviltester.github.io/grid-table-editor/`.
- Created the test evidence folder and this append-only log file.

Observations and results:
- The story expectation is that every command definition should expose at least one usage example and a validator.
- The PR expands scope beyond raw definitions into help metadata, method-picker rendering, docs refresh, new contract tests, and at least one command addition/removal (`internet.httpMethod` added and `image.urlLoremFlickr` removed per PR summary).
- The highest-value exploratory target is the command-definition/help experience in the deployed app and published docs, with secondary attention on regressions in related docs/help flows.

## 2026-06-20 17:05 +01:00

- Exercise the highest-risk command-help surface in the deployed generator by sampling the method-picker modal, verifying that examples/rendering exist, and probing whether validator expectations hold in actual schema entry.

Actions taken:
- Opened the published test environment landing page and confirmed it is built from branch `226-command-examples-and-validators`, commit `d14451bc4da0`, built at `2026-06-20T15:51:06.891Z`.
- Opened `generator.html`.
- Switched the starter schema row from `regex` to `faker`, opened the schema-method picker, and inspected the structured details for `helpers.arrayElement`.
- Confirmed the picker now exposes description, schema snippet, parameter details, parameter types, usage examples, return examples, and a docs link.
- Switched the row type to `domain`, opened the method picker again, filtered to `internet.httpMethod`, and reviewed the structured details.
- Applied `internet.httpMethod`, added column name `method`, and previewed with no params.
- Entered valid params `(commonOnly=true)` and previewed again.
- Entered invalid params `(commonOnly=maybe)` and previewed again.

Observations and results:
- The help/details experience is materially richer than before and appears aligned with the story intent: sampled commands expose at least one usage example and structured parameter metadata.
- `internet.httpMethod` details specifically document both `commonOnly` and `excludes`, include multiple usage examples, and show return examples.
- Baseline preview with `internet.httpMethod` generated plausible HTTP methods including `HEAD`, `TRACE`, `OPTIONS`, `PUT`, `GET`, `DELETE`, and `CONNECT`.
- Valid params `(commonOnly=true)` narrowed preview output to the documented common-method subset (`HEAD`, `POST`, `GET`, `PUT`, `DELETE`) and did not leak uncommon verbs, which is a good sign.
- Potential defect: invalid params `(commonOnly=maybe)` were not rejected or surfaced as an error. Instead, preview output degraded into nonsensical strings such as `internetQhttpMethodcommonOnly=maybe` and `internet[httpMethodcommonOnly=maybe`, which suggests failed validation is falling through into the wrong generation/parsing path instead of blocking invalid schema input.

## 2026-06-20 17:08 +01:00

- Broaden coverage to determine whether the invalid-param failure mode is isolated, and verify that the published docs in the test environment reflect the changed command catalog and examples.

Actions taken:
- Opened the published nested docs page for `internet Domain` at `site/docs/test-data/domain/internet/`.
- Confirmed the docs page contains a dedicated `internet.httpMethod` section with examples for the default call, `commonOnly=true`, and `excludes="patch, TRACE"`.
- Opened the published nested docs page for `image Domain` and checked whether the removed `urlLoremFlickr` command still appeared.
- Returned to the generator, switched the selected command from `internet.httpMethod` to `string.alpha`, and reviewed its method-picker details.
- Entered invalid params `(length=abc)` for `string.alpha` and previewed the results.
- Captured screenshots for the report:
  - `docs/testing/issue-226/invalid-string-alpha-param-preview.png`
  - `docs/testing/issue-226/internet-httpmethod-docs.png`

Observations and results:
- The published docs in the test environment do include the new `internet.httpMethod` documentation with multiple examples and return samples, which is consistent with the PR intent.
- The published `image Domain` docs did not expose `urlLoremFlickr`, which is consistent with the PR summary that the deprecated command was removed.
- The invalid-param failure mode reproduced outside the internet domain. `string.alpha(length=abc)` was not rejected; instead preview output degraded into malformed values such as `stringXalphalength=abc` and `string:alphalength=abc`.
- This strengthens the defect hypothesis that invalid command params are bypassing validator protection and falling through into another parser/generator path rather than producing an actionable validation failure.
