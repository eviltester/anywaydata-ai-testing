# Defect 001 - Raw regex shorthand with comma quantifiers is parsed as enum values

Severity: Medium

Status: Confirmed repeatable

## Summary

A raw regex shorthand copied from published docs, `[A-Z]{3,6}[0-9]{0,6}`, is not treated as a regex. In deployed generator text mode it is normalized as an enum split at commas inside the regex quantifiers, producing malformed values such as company names suffixed with `6}` or `6}[0-9]{0`.

## Environment

- Deployed URL: https://eviltester.github.io/grid-table-editor/generator.html
- Story: https://github.com/eviltester/grid-table-editor/issues/230
- PR: https://github.com/eviltester/grid-table-editor/pull/247

## Steps to Reproduce

1. Open the deployed generator.
2. Click `Edit as Text`.
3. Paste:

```text
Company
company.name
Regex Generated Field
[A-Z]{3,6}[0-9]{0,6}
```

4. Set preview count to 5.
5. Click `Preview`.

## Expected Result

The second field should generate strings matching the regex, e.g. 3-6 uppercase letters optionally followed by 0-6 digits.

## Actual Result

The regex rule is normalized to an enum-like rule and generated values contain fragments split around regex quantifier commas.

## Evidence

- Screenshot: `../screenshots/defect-001-raw-regex-input.png`
- Screenshot: `../screenshots/defect-001-raw-regex-after.png`
- Video: `../videos/defect-001-raw-regex-comma-quantifier.webm`
- Support data: `../support/defect-001-repeat-evidence.json`

## Notes for Fix Agent

Schema docs state raw regex patterns are accepted when text does not look command-like. The parser should not split raw regex quantifier commas as enum separators, or docs should require explicit `regex(...)` for comma quantifiers.
