# Defect 006: Published docs still show old pipe-style enum types while app shows enum dropdowns

## Summary

The deployed app picker and params dialogs expose enum params as `enum` dropdowns, but the published domain docs still show old pipe-style type strings such as `lower|upper|mixed` and `hex|decimal|css|binary`. This creates a docs/help/runtime consistency mismatch for PR 305.

## Environment

- Deployed docs: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/`
- Deployed generator: `https://eviltester.github.io/grid-table-editor/generator.html`
- Story: `https://github.com/eviltester/grid-table-editor/issues/295`
- PR: `https://github.com/eviltester/grid-table-editor/pull/305`

## Repeat Steps

1. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/color/#colorrgb`.
2. Inspect the `color.rgb` parameter table.
3. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
4. Select domain command `color.rgb`.
5. Open `Edit params for color.rgb`.
6. Compare the docs type labels with the params dialog controls.

## Expected

Published docs should align with the app help/model metadata for enum params. If the app says the type is `enum` and exposes allowed values as dropdown options, the docs should present the same model clearly.

## Actual

The docs show old pipe-style type strings:

- `casing`: `lower|upper|mixed`
- `format`: `hex|decimal|css|binary`

The app params dialog shows both params as enum dropdowns:

- `casing value`: `Unset`, `lower`, `upper`, `mixed`
- `format value`: `Unset`, `hex`, `decimal`, `css`, `binary`

## Evidence

![docs old pipe enum types](../screenshots/defect-006-docs-color-rgb-pipe-types.png)

![app enum dialog for color.rgb](../screenshots/defect-006-app-color-rgb-enum-dialog.png)

Local-only video: `../videos/defect-006-docs-old-pipe-types-vs-app-enum.webm`

## Broader Sample

The same stale-docs pattern was observed in sampled sections for:

- `airline.seat.aircraftType`
- `commerce.isbn.variant`
- `date.birthdate.mode`
- `finance.bitcoinAddress.type`
- `finance.bitcoinAddress.network`
- `internet.ipv4.network`
- `internet.mac.separator`
- `internet.url.protocol`
- `location.countryCode.variant`
- `person.firstName.sex`
- `phone.number.style`
- `string.uuid.version`
- `word.noun.strategy`
- `lorem.word.strategy`

`autoIncrement.timestamp.type` is related: app picker/dialog show the param as `enum` with plural units, while the docs table still shows `string`.
