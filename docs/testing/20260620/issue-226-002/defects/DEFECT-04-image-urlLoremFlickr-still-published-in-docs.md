# DEFECT-04: Removed `image.urlLoremFlickr` Command Still Appears In Published Image Docs

## Summary

`image.urlLoremFlickr` is absent from the live picker/runtime but still present in the published image docs/help surface, including method listings and body content.

## Why This Matters

- The PR notes indicate the deprecated command was removed.
- Leaving it in published docs creates stale guidance and can mislead users into looking for a command that no longer exists.
- This is a concrete removal/regression-parity defect and is useful as a focused docs-fix task.

## Environment

- Live picker/runtime: [generator.html](https://eviltester.github.io/grid-table-editor/generator.html)
- Published image docs: [site/docs/test-data/domain/image](https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image)

## Reproduction

1. Open the deployed generator.
2. Switch a row to `domain`.
3. Open the live picker and inspect image-related commands.
4. Search for or visually inspect whether `image.urlLoremFlickr` exists.
5. Open the published image docs page.
6. Search the page for `image.urlLoremFlickr`.

## Expected Result

- If the command has been removed, it should no longer be visible in live picker/runtime or in published docs/help content.

## Actual Result

- It is absent from the live picker/runtime.
- It is still present in the published image docs/help content.

## Evidence

- Command coverage log: [command-coverage-test-log.md](../command-coverage-test-log.md)
- Main report confirmed defect: [issue-226-second-session-test-report.md](../issue-226-second-session-test-report.md)

## Likely Investigation Areas

- image domain docs source markdown
- docs generation path for removed commands
- command catalog to docs sync rules

## Investigation Questions

- Was the runtime catalog updated without regenerating the image docs?
- Is the docs generator consuming a stale source list for image commands?
- Are there other removed commands still present in published docs?

## Fix Verification Ideas

- Re-check the image docs page and table of contents after the change.
- Confirm the command is absent from both docs and picker/runtime.
- Spot-check another removed or renamed command to rule out a broader stale-doc generation problem.

