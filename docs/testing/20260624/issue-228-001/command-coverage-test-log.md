# Command Coverage Test Log

---
## 2026-06-24T17:52:00.0000000+01:00

- Charter: sample representative positive command usage across broad command families on the deployed branch, with special attention to examples exposed by the UI and docs.

Techniques and heuristics to use: exploratory testing, risk-based sampling, equivalence partitioning, consistency checking across help/docs/runtime, and pairwise breadth across command families.

Expected focus: domain command families, faker/helper commands, newly added or newly surfaced commands, removed/deprecated commands, commands with validators, commands with structured params, and commands whose help/docs contain multiple examples.

---
## 2026-06-24T18:28:00.0000000+01:00

- Cover broad representative command families on the deployed branch using the strongest current runtime and docs surfaces, because the original command-coverage lane did not finish in time and the session still needs explicit command-family sampling evidence.

Actions taken:

- Executed regex in generator row mode with column `ProofValue` and pattern `[A-Z]{4}`, then previewed generated output.
- Executed enum/domain-normalization paths in generator text mode:
  - `enum(active,inactive,pending)`
  - `awd.datatype.enum(GET,POST,PUT,PATCH)`
  - `datatype.enum(values="GET,POST,PUT")`
- Switched the named-values enum case back to row mode and confirmed it normalized to `enum` with value `GET,POST,PUT`.
- Verified the generator domain picker visibly contains `datatype.enum`.
- Verified published docs coverage by fetched HTML for:
  - datatype docs
  - image docs
  - internet docs
  - method-picker UI spec docs
- Incorporated the UX lane’s live faker-helper evidence for `helpers.rangeToNumber`.
- Incorporated the negative-validation lane’s live structured-domain evidence for `date.between`.

Observations:

- Sampled command families/source types:
  - `regex`: positive runtime generation confirmed
  - `enum`: positive runtime generation confirmed in row mode and text mode
  - `domain`: `datatype.enum` is exposed in the picker and executes through text-mode domain syntax
  - `faker/helper`: `helpers.rangeToNumber` is discoverable but its documented object-shaped params are blocked by the params editor
  - structured-param domain validation: `date.between` rejects missing params, wrong primitive shape, and reversed bounds with visible blocking feedback
  - removed/deprecated docs check: image docs omit `urlLoremFlickr`
  - multi-example/structured docs check: internet docs include `internet.httpMethod` with `commonOnly` and `excludes`
- Strongest command-coverage defect signal from this pass:
  - malformed explicit enum syntax can be silently treated as literal generated output
  - `helpers.rangeToNumber` object params are taught in help but blocked in the UI
  - `datatype.enum` is present in runtime but absent from key published docs surfaces
- Deferred families/why:
  - broader faker-helper family sweep: deferred for time after the `helpers.rangeToNumber` contradiction was confirmed
  - app-side positive command execution across multiple source types: deferred because the app shell is denser and the generator gave faster issue-focused evidence
  - HTML/Gherkin export parity for enum: deferred to final-gap/risk notes after stronger core defects were already found

---
---
## 2026-06-24T17:56:22.1679242+01:00
- intent
  focused broad-sampling pass across deployed runtime, nested docs, and published command/help surfaces for issue #228 / PR #243 command coverage, aiming to hit domain, faker/helper, changed-docs, structured-param, and multi-example families quickly without local repo verification.
- actions
  used Playwright against https://eviltester.github.io/grid-table-editor/ and https://eviltester.github.io/grid-table-editor/generator.html to confirm the deployed test environment, inspect the generator runtime surfaces, and capture a screenshot of the live generator command surface.
  sampled the live generator UI source-type selector and related help affordances: enum, literal, regex, domain, faker; also sampled the runtime output-format surface and option/help controls to confirm broad published command exposure from the deployed app.
  fetched and reviewed live nested docs pages from the deployed site: test-data/domain/domain-test-data, test-data/faker-test-data, test-data/Schema-Definition, test-data/generate-to-file, and interfaces-and-deployment/cli-node-and-bun.
  checked for changed or stale terminology on sampled live docs pages, including migration guidance for helper usage and stale datatype.enum references.
- observations
  runtime surface looked broadly healthy in sampling: generator.html exposed the expected schema source families (enum, literal, regex, domain, faker), a large published output-format matrix, and help/option controls. Screenshot saved at screenshots/command-coverage-generator-runtime.png.
  domain example coverage was strong on the live docs page: examples included person.firstName(), internet.email(), location.cardinalDirection(abbreviated=true), date.between(from=1577836800000, to=1659312000000), finance.iban(formatted=true, countryCode="GB"), and number.int(min=32, max=47).
  faker/helper coverage was also explicit on the live docs page: helpers.mustache(...), helpers.fake(...), and faker.location.cardinalDirection({ abbreviated: true }) were published, with page guidance saying helpers.* is faker-only and not part of the domain abstraction.
  changed-docs / migration coverage looked intentionally updated on the live domain docs: the page explicitly marks domain.helpers.fake("...") as a before-invalid example and redirects readers to faker.helpers.fake("...") or helpers.fake(...) in faker contexts. I did not find sampled live references to datatype.enum on the reviewed pages.
  structured-parameter coverage was strong on the live CLI page: --show-progress, --stream, --stream-threshold, --unsafe-faker-expressions, --trim-input, and --trim-input-fields were all documented alongside amend-specific parameters and behavior notes.
  multi-example surface coverage was strong on the live docs: the CLI page published multiple generate and amend examples, while Schema Definition published two-line, compact inline, and values-form examples such as Status: enum("Open","In Progress","Closed") and Browser: Chrome,Firefox,Safari.
  generate-to-file docs provided a second docs-example surface tying rule families together and explicitly listed Faker, RegEx, Literal, and Enum, including pairwise generation as part of the published generation workflow.
  deferred in this rapid pass: deeper per-domain drill-down pages beyond the top-level domain index, direct validation of every runtime help icon navigation target, and broader nested blog/help coverage. Those were deferred to keep this pass broad and fast.
---
