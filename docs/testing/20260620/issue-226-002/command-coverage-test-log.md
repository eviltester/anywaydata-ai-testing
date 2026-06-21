## 2026-06-20 17:23 +01:00

- Establish the command-coverage subagent charter so representative positive-path coverage can be gathered across many amended command families and docs examples.

the actions you take

- Created the command coverage subagent log.
- Reserved this log for broad command-family sampling, docs-example execution, and coverage accounting.

the observations and results that you make

- This area needs to prove breadth, not just depth on one command.

## 2026-06-20 18:57 +01:00

- Sample one newly added command from the amended internet family, check whether the removed `image.urlLoremFlickr` still leaks through picker/docs/help, and add one quick breadth note so this log contributes real command-surface coverage.

the actions you take

- Opened the deployed generator at `https://eviltester.github.io/grid-table-editor/generator.html`.
- Switched the schema row to `domain`, inspected the live command picker options, selected `internet.httpMethod`, entered column name `method`, and ran `Preview`.
- Read the output preview and first visible preview-grid rows.
- Followed the command help surface for internet/image using the published docs URLs and fetched the published `image` and `internet` domain docs HTML to check for `internet.httpMethod`, `image.urlLoremFlickr`, and related examples.
- Performed one extra quick breadth check by confirming the same live picker still exposes representatives from other amended families (`date.month`, `finance.pin`, `string.alpha`, `word.words`) and sampling `number.int`.
- Techniques/heuristics used: positive-path sampling, docs/UI cross-checking, command-family breadth sampling, oracle comparison against published docs/help, and consistency heuristics across picker/help/docs/runtime surfaces.

the observations and results that you make

- `internet.httpMethod` is present in the live domain picker and in the published internet docs/help.
- Executing `internet.httpMethod` in the deployed generator produced plausible HTTP verbs in preview and grid output, including `PATCH`, `TRACE`, `PUT`, `OPTIONS`, `DELETE`, and `CONNECT`.
- The published internet docs/help currently show `internet.httpMethod()` with `No parameters`; I did not see published filtering/exclusion usage examples on that surface during this pass.
- `image.urlLoremFlickr` is absent from the live generator command picker while `image.url` and `image.urlPicsumPhotos` are present.
- The published image domain docs still contain `image.urlLoremFlickr` in the method list, body content, and table of contents, so removal appears incomplete across docs/help versus picker/runtime.
- Quick breadth note: the same live picker still exposed representatives from other broadly amended families (`date.month`, `finance.pin`, `string.alpha`, `word.words`), and a fast `number.int` sample still generated numeric-looking values in preview rows.
- New ideas suggested by this coverage: compare the published internet docs/examples against the actual `internet.httpMethod` parameter dialog/runtime support for filter or exclude behavior; audit the image docs/help generation path for stale removed commands; spot-check other removed/renamed commands for the same picker-vs-docs drift pattern.
