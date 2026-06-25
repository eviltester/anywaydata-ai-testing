# Text Schema Unknown Command Falls Back To Regex-Like Generation

## Severity

Medium

## Summary

In text-schema mode, command-like input such as `internet.notACommand` generates regex-like values instead of reporting that the domain command is unknown.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter:

   ```text
   bad
   internet.notACommand
   ```

4. Click `Preview`.

## Expected Result

Because the value looks like a domain command but is not in the command catalog, the app should show a clear unknown-command validation message.

## Actual Result

The app generates values such as `internet3notACommand`, `internet<notACommand`, and `internet_notACommand`.

## Evidence

- `../logs/negative-validation-test-log.md`
- `../screenshots/negative-validation-unknown-command-generates-regex.png`

## Repeatability

Repeated from a clean generator state by the negative-validation lane.
