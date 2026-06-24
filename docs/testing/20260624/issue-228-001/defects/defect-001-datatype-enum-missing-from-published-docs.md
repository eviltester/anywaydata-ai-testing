# Defect 001: `datatype.enum` Missing From Published Docs Surfaces

## Summary

The deployed runtime and generator UI expose `datatype.enum`, but the published datatype domain docs and the published method-picker UI spec docs do not mention `datatype.enum`.

## Environment

- Deployed test environment: `https://eviltester.github.io/grid-table-editor/`
- Session date: `2026-06-24`
- Branch shown on landing page: `codex/228-improve-command-definition`
- Commit shown on landing page: `8382b9e1947b`

## Repeatability

Repeatable.

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the first schema row to `domain`.
3. Open or inspect the domain command picker list.
4. Observe that `datatype.enum` is present in the command list.
5. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/datatype/`.
6. Inspect the published page content or fetch the page HTML.
7. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/method-picker-ui-spec`.
8. Inspect the published page content or fetch the page HTML.

## Expected Result

Published docs/help surfaces should document `datatype.enum` when the deployed runtime and UI expose it as a supported command.

## Actual Result

- The generator domain picker exposes `datatype.enum`.
- The published datatype domain docs do not contain `datatype.enum`.
- The published method-picker UI spec docs do not contain `datatype.enum`.

## Evidence

- Runtime/UI exposure screenshot: [main-loop1-domain-picker.png](../screenshots/main-loop1-domain-picker.png)
- Deployed datatype docs screenshot: [main-loop1-datatype-doc.png](../screenshots/main-loop1-datatype-doc.png)
- HTML verification captured during the session:
  - datatype docs HTML contained `datatype.boolean` but not `datatype.enum`
  - method-picker UI spec HTML did not mention `datatype.enum`

## Why This Matters

This creates a docs/help drift defect on the same deployed branch that introduces and normalizes `datatype.enum`. Users can discover and execute the command in the runtime, but cannot find matching published guidance in the most obvious documentation surfaces.
