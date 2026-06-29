# Defect 002 - autoIncrement.sequence negative zeropadding generates **ERROR** rows

## Summary

`autoIncrement.sequence(zeropadding=-1)` generates repeated `**ERROR**` values in the deployed generator preview instead of being rejected with a visible validation message.

## Environment

- Deployed generator: `https://eviltester.github.io/grid-table-editor/site/generator.html`
- Date tested: 2026-06-29

## Repeatability

Repeatable in generator text schema mode.

## Reproduction

1. Open `https://eviltester.github.io/grid-table-editor/site/generator.html`.
2. Click `Edit as Text`.
3. Enter schema:

```text
Id
autoIncrement.sequence(zeropadding=-1)
```

4. Click `Preview`.

## Observed

- Preview table contains ten `**ERROR**` rows under `Id`.
- No visible validation message explains that negative zero padding is invalid.

![Negative zeropadding error rows](../screenshots/defect-autoincrement-negative-zeropadding-generator.png)

Video: [defect-autoincrement-negative-zeropadding-generator.webm](../videos/defect-autoincrement-negative-zeropadding-generator.webm)

## Expected

The schema should be rejected before generation with a visible validation message, e.g. `zeropadding must be greater than or equal to 0`.

## Notes For Fix Investigation

This appears related to Defect 001. Both failures allow invalid auto-increment parameters through validation and then surface runtime error sentinels as generated data.
