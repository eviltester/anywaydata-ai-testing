# Defect 001: Params editor emits invalid bare date-like values instead of serializing quoted string params

## Summary

The params editor accepts ISO date-like text in string/date-like fields, but its generated params preview emits the value bare. The dialog then reports a validation error and disables `Apply`, requiring the user to manually type quotes inside the field. This undercuts the guided params editor goal because a valid date-like string cannot be applied without knowing the raw schema quoting rules.

## Environment

- Deployed URL: `https://eviltester.github.io/grid-table-editor/generator.html`
- Story: `https://github.com/eviltester/grid-table-editor/issues/295`
- PR: `https://github.com/eviltester/grid-table-editor/pull/305`

## Repeat Steps

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. In the first schema row, set field type to `domain`.
3. Select command `string.uuid`.
4. Open `Edit params for string.uuid`.
5. Set `version value` to `7`.
6. Enter `2026-06-18T00:00:00.000Z` in `refDate value`.
7. Observe the generated params preview and Apply state.

Related repeat path:

1. Select command `autoIncrement.timestamp`.
2. Open params.
3. Enter `2026-06-12T12:39:23Z` in `start value`, `15` in `step value`, and `minutes` in `type value`.
4. Observe generated params preview and Apply state.

## Expected

The guided editor should either serialize date-like string values as quoted params, for example:

```text
(version=7,refDate="2026-06-18T00:00:00.000Z")
```

or provide a control/type-specific input that makes the required quoting rule clear before the user enters the value.

## Actual

The generated params preview emits bare date-like values:

```text
(version=7,refDate=2026-06-18T00:00:00.000Z)
```

and:

```text
(start=2026-06-12T12:39:23Z,step=15,type="minutes")
```

The dialog then reports:

```text
Row 1: invalid domain params - Invalid keyword arguments: bare values are not allowed; wrap strings in quotes
```

`Apply` is disabled, so the user has to know to type quotes manually inside the value field.

## Evidence

![string.uuid refDate dialog error](../screenshots/defect-001-uuid-refdate-dialog.png)

![autoIncrement.timestamp start dialog error](../screenshots/defect-001-unquoted-start-dialog.png)

Local-only video: `../videos/defect-001-params-editor-unquoted-string-param.webm`

## Notes

This is not a runtime command-generation failure when the schema is manually quoted correctly. Loop 3 confirmed `string.uuid(version=7,refDate="2026-06-18T00:00:00.000Z")` previews successfully. The defect is in the guided params editor serialization/UX for string-like union fields.
