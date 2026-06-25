# Modal focus is not restored to trigger after Escape close

## Severity

Medium

## Area

`generator.html` method picker and params editor modal keyboard/focus paths.

## Environment

Deployed target: <https://eviltester.github.io/grid-table-editor/generator.html>

Date observed: 2026-06-25

## Summary

Closing the method picker or params editor with Escape closes the modal but leaves focus on `<body>` instead of returning focus to the control that opened the modal. Keyboard and assistive-technology users lose their place in the schema row after dismissing either modal.

## Reproduction - Method Picker

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the first schema row type to `faker`.
3. Focus `Select faker command`.
4. Press Enter to open the method picker.
5. Observe focus moves to the picker search input.
6. Press Escape.

## Expected

The picker closes and focus returns to the `Select faker command` button that opened it.

## Actual

The picker closes and focus lands on `<body>`.

Observed focus state after Escape:

```json
{
  "modalVisible": false,
  "active": {
    "tag": "BODY",
    "cls": "theme-light"
  }
}
```

## Reproduction - Params Editor

1. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
2. Change the first schema row type to `faker`.
3. Open the method picker.
4. Switch to `All`, search `number.int`, select it, and Apply.
5. Focus the params button.
6. Press Enter to open the params editor.
7. Observe focus moves to `min value`.
8. Press Escape.

## Expected

The params editor closes and focus returns to the params button that opened it.

## Actual

The params editor closes and focus lands on `<body>`.

Observed focus state after Escape:

```json
{
  "modalVisible": false,
  "active": {
    "tag": "BODY",
    "cls": "theme-light"
  }
}
```

## Evidence

- `../screenshots/method-picker-keyboard-after-esc.png`
- `../screenshots/params-editor-keyboard-after-esc.png`

## Impact

The modal workflows are keyboard-operable enough to open and close, but users must manually rediscover their location in the form after closing. This is especially frustrating in multi-row schemas and creates an accessibility regression risk.

