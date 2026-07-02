# Defect 003: Invalid `autoIncrement.timestamp` start value generates `**ERROR**` rows instead of validation error

## Summary

`autoIncrement.timestamp` validates several malformed params before generation, but an invalid quoted `start` value is not rejected. Preview and Generate Data produce rows containing `**ERROR**`, and the downloaded CSV also contains `**ERROR**` values.

## Environment

- Deployed URL: `https://eviltester.github.io/grid-table-editor/generator.html`
- Story: `https://github.com/eviltester/grid-table-editor/issues/295`
- PR: `https://github.com/eviltester/grid-table-editor/pull/305`

## Repeat Steps

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Click `Edit as Text`.
3. Enter:

```text
Created
autoIncrement.timestamp(start="not-a-date", step=1, type="seconds")
```

4. Set `Preview Items Count` to `5`.
5. Click `Preview`.
6. Optionally click `Generate Data`.

## Expected

The schema should be rejected with a clear validation error for the invalid `start` value before data generation.

## Actual

No visible validation error is shown. The output preview contains:

```text
"Created"
"**ERROR**"
"**ERROR**"
"**ERROR**"
"**ERROR**"
"**ERROR**"
```

Loop 3 also confirmed `Generate Data` reports `Download ready: generated-data.csv` and the downloaded file contains repeated `**ERROR**` rows.

## Evidence

![invalid timestamp start error rows](../screenshots/defect-003-invalid-timestamp-error-rows.png)

Local-only video: `../videos/defect-003-invalid-timestamp-start-error-rows.webm`

Downloaded local-only support file: `../support/loop3-invalid-timestamp-download.csv`

## Notes

Other timestamp params are validated correctly: invalid `type`, uppercase units, unknown `unit`, and string `step` produce explicit validation errors. This defect is specific to invalid `start` values reaching generation.
