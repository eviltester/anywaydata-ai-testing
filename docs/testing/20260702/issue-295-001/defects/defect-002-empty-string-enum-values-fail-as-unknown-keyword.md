# Defect 002: Empty string values inside `enum(...)` fail as `Unknown keyword: enum`

## Summary

The deployed generator rejects enum declarations containing an empty string choice with `Unknown keyword: enum`. Empty values work through `literal("")`, empty constraints work outside enum fields, and whitespace-only enum values work, so this looks like an empty-string enum parsing/validation defect rather than an intentional unsupported feature.

## Environment

- Deployed URL: `https://eviltester.github.io/grid-table-editor/generator.html`
- Story: `https://github.com/eviltester/grid-table-editor/issues/295`
- PR: `https://github.com/eviltester/grid-table-editor/pull/305`

## Repeat Steps

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Click `Edit as Text`.
3. Enter:

```text
MaybeBlank
enum("","A")
```

4. Set `Preview Items Count` to `5`.
5. Click `Preview`.

Additional repeated inputs:

```text
MaybeBlank
enum("A","")
```

```text
MaybeBlank
enum("")
```

```text
MaybeBlank: enum("", "A")
```

## Expected

The generator should either support empty string enum choices or reject them with a clear validation message explaining that empty enum values are not supported.

## Actual

Preview fails with:

```text
MaybeBlank failed domain validation - Unknown keyword: enum
```

The message misclassifies the valid-looking `enum(...)` command as unknown only when an empty quoted value is present.

## Evidence

![empty enum before preview](../screenshots/defect-002-empty-enum-before-preview.png)

![empty enum error](../screenshots/defect-002-empty-enum-error.png)

Local-only video: `../videos/defect-002-empty-string-enum-unknown-keyword.webm`

## Notes

Loop 2 confirmed `enum(" ","A")` generates values, and a `literal("")` field with an empty-string constraint generates successfully. That narrows the defect to truly empty enum values.
