# Enum And Params Cross-Surface Test Log

---
## 2026-06-24T21:31:00.0000000+01:00

- Charter: trace enum behavior and structured params workflows across row mode, text mode, domain-command usage, helper params, preview/generation, and export-oriented surfaces in the current deployed branch.

Techniques and heuristics to use: state/flow modeling, positive and negative sampling, normalization/oracle checking, and repeatability checks across multiple syntax variants and param shapes.

Expected focus: `enum(...)`, `datatype.enum(...)`, `awd.datatype.enum(...)`, displayed versus saved syntax, cross-surface parity between app and generator, and object/structured params flows such as helper configurations and domain modal editing.

---

## 2026-06-24T21:52:14.3071730+01:00

- Charter: verify deployed generator and published docs parity for enum syntax variants and structured params surfaces only, with no local-source assumptions.

Actions taken:
- Opened `https://eviltester.github.io/grid-table-editor/generator.html` and switched between text mode and row mode on the live deployed page.
- Imported a mixed enum schema using `enum(...)`, `datatype.enum(...)`, and `awd.datatype.enum(...)`, then round-tripped it back to text mode.
- Imported structured domain params using `number.int(min=32, max=47)` and `person.fullName(sex="female")`, then inspected row-mode params fields, validation, button states, and the `number.int` params dialog/help link.
- Cross-checked published docs at `/site/docs/test-data/pairwise-testing`, `/site/docs/test-data/domain/domain-test-data`, and `/site/docs/test-data/domain/number`.

Observations:
- Published pairwise docs advertise `enum(...)`, `datatype.enum(...)`, and `awd.datatype.enum(...)`; the live generator accepts all three, but row mode collapses every variant to source type `enum` with bare comma-separated values.
- Round-tripping back to text mode rewrites qualified enum forms to plain `enum(...)`, so `datatype.enum(...)` and `awd.datatype.enum(...)` are accepted authoring variants rather than preserved output syntax.
- Row-mode guided editing exposes only `enum`, `literal`, `regex`, `domain`, and `faker`, so the qualified enum variants are text-mode-only concepts even though the docs present them as peer function styles.
- The live domain command picker also lists `datatype.enum`, which overlaps with the pairwise docs treating `datatype.enum(...)` as an enum syntax variant and makes the same token family appear in two different editing surfaces.
- Structured params are split across two live surfaces: raw params text stays editable as `(min=32, max=47)`, while the `number.int` dialog/help surface labels the command as `awd.domain.number.int` and rewrites the generated summary to compact `(min=32,max=47)`.
- Unsupported structured params still import from text mode, but guided editing blocks them: `person.fullName(sex="female")` remains visible in the params field, raises `invalid domain params - Invalid keyword arguments: unknown named argument "sex"`, and its params button is disabled with `No documented params available`.

---
