# Removed `image.urlLoremFlickr` Has Misleading Feedback

## Severity

Medium

## Summary

The removed/deprecated `image.urlLoremFlickr` command is absent from docs and picker search, but text-schema use produces misleading parameter-wrapping feedback and may still trigger Faker deprecation warnings internally.

## Environment

- Target: https://eviltester.github.io/grid-table-editor/site/generator.html
- Scope: issue #246 / story #226 / PR #231 deployed master review

## Steps To Reproduce

1. Open the deployed generator.
2. Switch to `Edit as Text`.
3. Enter either:

   ```text
   img
   image.urlLoremFlickr
   ```

   or:

   ```text
   img
   image.urlLoremFlickr()
   ```

4. Click `Preview`.

## Expected Result

The app should say the command is unknown, removed, or replaced by `image.url`.

## Actual Result

The app reports parameter-wrapping style messages such as `params should be wrapped in parentheses`, which implies the command exists but was called incorrectly. The command-coverage lane also observed repeated browser warnings for deprecated `faker.image.urlLoremFlickr()`.

## Evidence

- `../logs/command-coverage-test-log.md`
- `../logs/negative-validation-test-log.md`
- `../screenshots/command-coverage-removed-urlLoremFlickr-message.png`

## Repeatability

Repeated by both the command-coverage and negative-validation lanes.
