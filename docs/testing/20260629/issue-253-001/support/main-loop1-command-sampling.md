# Main Loop 1 Command Sampling

| Case | Family | Mode after switch | Button | Dialogs | Status / evidence | Screenshot |
| --- | --- | --- | --- | --- | --- | --- |
| story-duplicate-min | domain validator duplicate params | schema | Edit as Text |  | Row 1: invalid domain params - Invalid keyword arguments: duplicate named argument "min" | ![story-duplicate-min](../screenshots/main-loop1-story-duplicate-min.png) |
| valid-number-int | domain valid params | schema | Edit as Text |  |  | ![valid-number-int](../screenshots/main-loop1-valid-number-int.png) |
| invalid-number-range | domain validator invalid range | schema | Edit as Text |  | Row 1: invalid domain params - Invalid keyword arguments: argument "min" must be less than or equal to argument "max" | ![invalid-number-range](../screenshots/main-loop1-invalid-number-range.png) |
| sequence-step-zero | changed autoIncrement.sequence validator | schema | Edit as Text |  | Row 1: invalid domain params - Invalid keyword arguments: argument "step" must be a non-zero integer | ![sequence-step-zero](../screenshots/main-loop1-sequence-step-zero.png) |
| sequence-negative-zeropadding | changed autoIncrement.sequence validator | schema | Edit as Text |  | Row 1: invalid domain params - Invalid keyword arguments: argument "zeropadding" must be greater than or equal to 0 | ![sequence-negative-zeropadding](../screenshots/main-loop1-sequence-negative-zeropadding.png) |
| valid-sequence | changed autoIncrement.sequence valid | schema | Edit as Text |  |  | ![valid-sequence](../screenshots/main-loop1-valid-sequence.png) |
| unknown-command | removed/unknown command | text | Edit as Schema |  | Mystery failed domain validation - Unknown keyword: notAReal.command / Row 1: unknown domain command "notAReal.command". | ![unknown-command](../screenshots/main-loop1-unknown-command.png) |
| malformed-call | malformed syntax | schema | Edit as Text |  | Row 1: params should be wrapped in parentheses, e.g. (min=1, max=3). | ![malformed-call](../screenshots/main-loop1-malformed-call.png) |
| regex-default | regex default examples | schema | Edit as Text |  |  | ![regex-default](../screenshots/main-loop1-regex-default.png) |
| literal-default | literal/default examples | schema | Edit as Text |  |  | ![literal-default](../screenshots/main-loop1-literal-default.png) |