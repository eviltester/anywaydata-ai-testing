# Params Editor Labels Optional Params As Required

## Severity

Low

## Summary

The params editor `Req` column exposes labels such as `Required commonOnly`, `Required excludes`, and `Required length` even when the picker details and docs mark those params as optional.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the generator.
2. Select a domain command such as `internet.httpMethod`.
3. Open the params editor.
4. Inspect the `Req` column labels.
5. Repeat with `string.symbol(length=5)`.

## Expected Result

Optional params should not be exposed as `Required <param>`. If the disabled checkbox indicates whether the param is required, the accessible label should not imply the optional param is currently required.

## Actual Result

The modal exposes labels like `Required commonOnly`, `Required excludes`, and `Required length` while docs and picker details say these params are optional.

## Evidence

- `../logs/ux-regression-test-log.md`
- `../screenshots/ux-regression-httpmethod-preview.png`

## Repeatability

Repeated with `internet.httpMethod` and `string.symbol`.
