# Semantic Invalid Params Generate `**ERROR**` Rows Instead Of Validation Feedback

## Severity

High

## Summary

Several invalid semantic parameter combinations reach generation and produce literal `**ERROR**` data rows instead of being rejected with actionable schema validation feedback.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review
- Browser: Playwright CLI against deployed GitHub Pages

## Steps To Reproduce

Open the deployed generator, switch to text schema mode, and preview any of these schemas:

```text
method
internet.httpMethod(excludes="GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS,TRACE,CONNECT")
```

```text
v
autoIncrement.sequence(zeropadding=-1)
```

```text
v
autoIncrement.timestamp(type="centuries")
```

```text
v
string.fromCharacters(characters=[], length=4)
```

```text
v
number.float(multipleOf=0)
```

```text
v
finance.iban(countryCode="ZZ")
```

## Expected Result

The schema should fail before generation with an actionable validation message explaining the invalid parameter combination.

## Actual Result

Preview generation proceeds and produces `**ERROR**` as row data, with no visible validation message explaining the invalid semantic value or impossible candidate pool.

## Evidence

- `../logs/negative-validation-test-log.md`
- `../screenshots/negative-validation-http-method-exclude-all-errors.png`

## Repeatability

Repeated across multiple command families in the negative-validation lane.
