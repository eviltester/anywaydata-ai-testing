# Published `helpers.mustache` Faker Example Is Rejected By Runtime

## Summary

The published faker docs include a `helpers.mustache(...)` example with an object-literal callback argument, but the deployed generator rejects that exact example as unsafe/too complex.

## Environment

- URL: `https://eviltester.github.io/grid-table-editor/generator.html`
- Docs page: `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`
- Branch: `codex/228-improve-command-definition`
- Commit: `a3b39ddcfe0f`
- Build: `2026-06-24T23:03:43.621Z`

## Steps To Reproduce

1. Open `https://eviltester.github.io/grid-table-editor/site/docs/test-data/faker-test-data`.
2. Find the published example:

   ```txt
   helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })
   ```

3. Open `https://eviltester.github.io/grid-table-editor/generator.html`.
4. Click `Edit as Text`.
5. Enter this schema:

   ```txt
   sentence
   helpers.mustache("I found {{count}} instances.", { count: () => `${this.number.int()}` })
   ```

6. Click `Preview`.

## Expected Result

The docs example should generate preview values, or the docs should avoid presenting it as a supported schema example in the browser generator.

## Actual Result

The preview output remains empty. The visible runtime error says:

```txt
Invalid Faker API Call Unsafe faker rule syntax detected: requires complex argument parsing
```

## Control Checks

- `helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")` generated names successfully.
- `faker.helpers.fake("Hi, my name is {{person.firstName}} {{person.lastName}}!")` generated names successfully.
- `domain.helpers.fake("Hi")` was rejected with visible guidance that `helpers.*` is faker-only, which matches the domain docs.

## Severity

Medium.

The docs advertise an example that users can copy directly, but the current deployed generator rejects it. This is especially risky because issue #228 / PR #243 changed command definitions/help and users may rely on docs examples as the oracle for supported helper syntax.

## Notes

If complex callback arguments are intentionally unsupported in browser schema text, the docs should use a safe `helpers.mustache` example or explicitly label this as a Faker API illustration rather than a supported generator schema rule.
