# DEFECT-05 Sticky Generator Help Overlay

## Problem

The top-level generator instructions help can remain open and block access to nearby help/docs links.

## Environment

- Deployed generator
- Narrow/mobile pass and accessibility heuristics

## Reproduction

1. Open the deployed generator.
2. Open `Data Generator Instructions` help.
3. Try dismissing it with `Escape` or by clicking the trigger again.
4. Try activating the nearby `Regex data help` link while the overlay remains visible.

## Expected

The help overlay should dismiss cleanly and should not block nearby controls.

## Actual

The overlay remained open during the sampled pass and then intercepted interaction with the nearby help link.

## Evidence

- [responsive-accessibility-test-log.md](../responsive-accessibility-test-log.md)
- [issue-226-third-session-test-report.md](../issue-226-third-session-test-report.md)

## Follow-Up

- Verify whether the same sticky-overlay behavior also affects keyboard-only access to adjacent help links.
