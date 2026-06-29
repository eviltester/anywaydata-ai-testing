---
## 2026-06-28T13:31:00+01:00

- What you think you want to do and why

Run command coverage and example execution against deployed generator, method picker, and published docs because PR #247 changed command metadata, parser/help, faker validation, and method-picker MVC.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Opened https://eviltester.github.io/grid-table-editor/generator.html. Proved browser access. Opened the Method Picker from a faker row. Inventoried tabs, helper commands, domain command count, help detail, docs links, and runtime generation examples. Tested representative commands through deployed Preview, including person, internet, number, location, commerce, string, helpers.arrayElement, helpers.arrayElements, helpers.rangeToNumber, helpers.slugify, helpers.uniqueArray, helpers.fromRegExp, helpers.replaceSymbols, helpers.weightedArrayElement, helpers.multiple, and removed image.urlLoremFlickr. Reviewed published docs for schema, regex, faker helpers, domain overview, number, person, and internet.

the observations and results that you make

Broad positive command execution looked healthy for sampled supported commands. Negative helper array validation and removed command validation were clear. Repeatable docs/runtime defects were found for Faker Helper docs examples using `this.word.sample` and `() => this.person.firstName()`, which the deployed validator rejects as unsafe/complex while alternative `faker.word.sample` syntax works. Picker search by command and parameter worked, and docs links for sampled commands resolved.

Techniques and heuristics used: exploratory testing, command-surface inventory, risk-based testing, docs/runtime consistency, negative validation, and representative sampling.

---
