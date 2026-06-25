# Command Coverage Test Log

---
## 2026-06-24T21:31:00.0000000+01:00

- Charter: sample representative positive command usage across broad command families on the current deployed branch, with special attention to docs examples, changed command/help surfaces, and multi-example coverage.

Techniques and heuristics to use: exploratory testing, risk-based sampling, equivalence partitioning, consistency checking across help/docs/runtime, and pairwise breadth across command families.

Expected focus: domain command families, faker/helper commands, newly surfaced commands, removed/deprecated commands, commands with validators, commands with structured params, and commands whose docs now contain multiple examples.

---
## 2026-06-24T22:05:00.0000000+01:00

- Run a narrowed breadth-first command coverage pass quickly, using the already-proven deployed generator runtime plus published docs pages, so this lane contributes broad sampling evidence without waiting on a deeper automation setup.

Used the current deployed generator evidence already captured in this session at `https://eviltester.github.io/grid-table-editor/generator.html` and `screenshots/browser-proof-generator-preview.png` as the live runtime anchor, because that interaction was already rerun on the current `fb9e8e2049e1` deployment and showed the generator accepting a schema row with regex `[A-Z]{5}` and producing uppercase five-letter values. Then reviewed the published docs shell at `https://eviltester.github.io/grid-table-editor/site/`, confirmed the docs entrypoint `https://eviltester.github.io/grid-table-editor/site/docs/intro`, and sampled representative command-family pages under `/site/docs/test-data/domain/`. The concrete docs pages sampled were:
`https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/datatype/`
`https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/date/`
`https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance/`
`https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet/`
`https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number/`

Used exploratory testing, risk-based sampling, equivalence partitioning, consistency/oracle checking, and pairwise breadth. Sampled command families and evidence:
`regex` runtime anchor: deployed generator accepted `[A-Z]{5}` and previewed values including `KFNRM`, `ZSMWQ`, and `VXEXZ`, which is a positive runtime spot check for validator-backed free-text command input.
`datatype` domain: published docs now expose `datatype.boolean()` and the changed `datatype.enum(values="active,inactive,pending")` plus `datatype.enum(values="GET,POST,PUT,PATCH")`. This confirms the new `datatype.enum` surface is live in published docs and has multiple examples.
`enum` normalization surface: the datatype page explicitly says the public enum can be authored as `enum("active","inactive","pending")`, `enum active,inactive,pending`, `active,inactive,pending`, or `datatype.enum(...)`, which is high-value coverage guidance for follow-on runtime checks.
`internet` domain: published docs expose multiple examples for `internet.email()` with structured optional parameters `allowSpecialCharacters`, `firstName`, `lastName`, and `provider`, which makes it a strong structured-param and multiple-example sample family.
`number` domain: published docs expose validator/constrained parameters such as `min`, `max`, `multipleOf`, and `fractionDigits`, including text warning that only one of `multipleOf` or `fractionDigits` should be passed. This is a strong validator-backed sample family.
`date` domain: published docs page is reachable, so the changed docs/help surface still exposes date-family commands for follow-on runtime comparison.
`finance` domain: published docs page is reachable, so finance remains part of the broad changed-surface command inventory even though this narrowed pass did not execute finance examples in the generator.
faker/helper surface: the docs sidebar exposes a `Faker Based Data` category, but quick direct guesses for a dedicated published `rangeToNumber` helper page returned `404`, so helper coverage was only partially sampled here and needs a follow-on lane through the generator/method-picker or a more targeted docs path search.

Observations and results:
Breadth sampled now covers domain commands, the changed enum surface, validator-backed parameters, structured parameters, and a docs page with many examples. The most useful direct runtime evidence in this fast pass is still the successful regex generation on the current deployed head. The most useful docs consistency evidence is that the published `datatype` page already contains the new `datatype.enum` naming and multiple compatibility forms, while `internet.email` and `number.*` pages provide multiple-example and validator-rich surfaces for more execution later. Deferred from this quick pass were: direct generator execution of `datatype.enum`, `internet.email`, and `number.float`; explicit removed/deprecated visibility checks; and a reliable published helper page for `rangeToNumber`.

New ideas generated from gaps in this lane:
`execute-now` if another lane picks them up soon: run `datatype.enum(values="GET,POST,PUT,PATCH")` in the generator and compare output with bare `enum GET,POST,PUT,PATCH`.
`execute-now`: run bare comma-list enum authoring `active,inactive,pending` in the generator and verify whether it normalizes or previews correctly.
`execute-now`: run `internet.email(provider="example.com")` and verify provider suffix in preview output.
`execute-now`: run `internet.email(firstName="Ada", lastName="Lovelace")` and check whether both named params influence output.
`execute-now`: run `number.float(min=1,max=2,fractionDigits=2)` and check decimal precision bounds.
`execute-now`: run `number.float(min=1,max=2,multipleOf=0.25)` and check multiples.
`execute-now`: run the invalid pair `number.float(multipleOf=0.25,fractionDigits=2)` and compare runtime behavior against docs guidance that only one should be passed.
`execute-now`: run `datatype.boolean()` and `datatype.boolean(probability=0.5)` to confirm default and parameterized forms both still preview.
`defer`: identify the exact published helper-doc URL for `rangeToNumber` and compare its wording with the params editor.
`defer`: search for removed or deprecated enum aliases still visible anywhere in published docs, app help, or method-picker content.

---
