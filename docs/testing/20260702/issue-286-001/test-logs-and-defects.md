# Test Logs and Defects - Issue 286 / PR 294`n

This file collates the full detailed information from all subagent logs and defect markdown files for PDF generation.



---


# Source: issue-286-test-log.md

---
## 2026-07-02 00:03:06 +01:00

- What you think you want to do and why

Create the fresh test artifact folder for issue 286, preserve the exact session prompt, prove browser access to the deployed test environment, and collect live story/PR metadata before substantial testing. This is needed to satisfy the requested deployed-only exploratory review setup and to ground planning in the actual PR changed surface.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Created docs/testing/20260702/issue-286-001/ with logs, support, screenshots, defects, and ideos subfolders.
- Copied the attached request text to issue-286-session-goal-prompt.md.
- Opened https://eviltester.github.io/grid-table-editor/site/ using Chrome DevTools MCP in isolated browser context grid-table-editor-20260702.
- Captured an accessibility snapshot to support/00-browser-proof-snapshot.txt.
- Clicked the Use The Application link to navigate to https://eviltester.github.io/grid-table-editor/site/app.html.
- Waited for the deployed app UI to load and saved screenshots/00-browser-proof.png.
- Queried GitHub using gh issue view 286, gh pr view 294, and gh pr diff 294 --name-only for viltester/grid-table-editor; saved raw outputs in support/issue-286.json, support/pr-294.json, and support/pr-294-files.txt.

the observations and results that you make

The deployed environment opens and can be interacted with. The app loaded after clicking from the landing page to pp.html; visible controls include the table editor controls, import/export tabs, preview text editor, and help disclosures. PR #294 is open, references issue #286, and changes 81 files with 2368 additions. The changed surface is dominated by domain command metadata, docs pages for domain command families, generated comparison/report tooling, command help example plumbing, and validator/test updates.

---
---
## 2026-07-02 00:08:27 +01:00

- What you think you want to do and why

Execute Loop 1 broad coverage against the deployed generator and published docs, then record initial findings and gaps. This is needed because PR #294 changed many command definitions and docs, so the first pass must sample across families rather than stop at a single behavior.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Used Chrome DevTools MCP on https://eviltester.github.io/grid-table-editor/site/generator.html.
- Extracted published domain docs text from https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/{airline,git,image,internet,location,lorem,number,person,science,system,word,string,date,finance} to support/published-domain-docs-text.json.
- Extracted schema syntax from https://eviltester.github.io/grid-table-editor/site/docs/test-data/Schema-Definition/ to support/docs-schema-definition.json.
- Switched generator to schema text mode and ran broad positive batch 1 with 16 columns:
  
umber.bigInt(min=100,max=1000), 
umber.bigInt(multipleOf=7), internet.httpStatusCode(types=["success"]), internet.email(provider="example.com"), image.dataUri(width=320,height=240,color="red",type="svg-base64"), image.url(width=1,height=1), person.fullName(firstName="Ada",lastName="Lovelace",sex="female"), location.countryCode(variant="alpha-3"), lorem.words(3), lorem.word(length=5), word.verb(length=5), system.fileName(extensionCount=2), git.commitSha(length=7), inance.accountNumber(length=5), string.alpha(length=5,casing="upper"), date.month(abbreviated=true).
- Saved Loop 1 broad batch evidence to screenshots/loop1-broad-positive-output.png and support/loop1-broad-positive-output.json.
- Ran negative/boundary batch covering BigInt invalid bounds and multipleOf, invalid HTTP status type, removed max on lorem/word, invalid image sizes, zero string/word lengths, and removed/unsupported lorem.words(count=3); saved results to support/loop1-negative-boundary-results.json.
- Opened the lorem.words params dialog and observed app help lists min, max, wordCount, wordCountMax, and wordCountMin, not count.
- Ran broad positive batch 2 with documented examples: irline.flightNumber(), image.urlPicsumPhotos(width=320,height=240,grayscale=true,blur=3), internet.httpMethod(commonOnly=true), internet.httpMethod(excludes="patch, TRACE"), internet.jwt(header={"value":"sample"}), location.streetAddress(useFullAddress=true), location.zipCode(format="#####"), person.sexType(includeGeneric=false), system.networkInterface(interfaceType="en",interfaceSchema="mac"), lorem.words(wordCount=5), word.sample(strategy="any-length"), string.fromCharacters(characters=["A","B","C"],length=4), string.binary(length=5,prefix="PRE-"), inance.bic(includeBranchCode=true), and date.birthdate(max=65,min=18,mode="age").
- Saved Loop 1 batch 2 evidence to screenshots/loop1-doc-example-batch2-output.png and support/loop1-doc-example-batch2-output.json.
- Reviewed completed subagent logs from the negative-validation and change-surface lanes.
- Independently reproduced the negative-validation finding with schema:
  NegExt: system.fileName(extensionCount=-1), FracExt: system.fileName(extensionCount=1.5), NormalExt: system.fileName(extensionCount=2).
- Clicked Preview and saved evidence to screenshots/defect-system-filename-extensioncount-invalid.png.

the observations and results that you make

Broad positive coverage generated expected output for many changed command families and documented examples. BigInt validators, HTTP status type validation, image width/height validation, removed max params, and zero length checks generally rejected invalid inputs with specific messages. lorem.words(count=3) is rejected, but current published docs and app help use wordCount, so this is a valid removed/unsupported-param negative case rather than a docs defect. A repeatable defect candidate remains: system.fileName(extensionCount=-1) and system.fileName(extensionCount=1.5) are accepted and generate output instead of being rejected as invalid extension counts.

---
---
## 2026-07-02 00:08:41 +01:00

- What you think you want to do and why

Start Loop 2 by reviewing Loop 1 results, subagent risk notes, and remaining coverage gaps. Generate at least 10 new test ideas, classify them, and execute all in-scope xecute-now items.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Loop 2 idea list:

1. xecute-now - Validate system.fileName(extensionCount) through the schema UI params dialog, not only text mode, to see whether invalid values can also be entered there.
2. xecute-now - Boundary-test system.commonFileName(extension="txt") and invalid extension-like values.
3. xecute-now - Boundary-test system.networkInterface(interfaceType/interfaceSchema) invalid constrained values.
4. xecute-now - Test date.birthdate(max/min) invalid ordering and invalid mode values.
5. xecute-now - Test finance length-like params, especially inance.accountNumber(length=0/-1/1.5).
6. xecute-now - Test string array/length params, especially string.fromCharacters(characters=[], length=4) and invalid length.
7. xecute-now - Test internet.jwt(header/payload) malformed structured object handling.
8. xecute-now - Test image.urlPicsumPhotos(blur) boundary values and wrong types.
9. xecute-now - Test location.zipCode(state=...) behavior because PR marks state as usage-example unsupported.
10. xecute-now - Test output format change to JSON for a representative positive schema to ensure values are not CSV-only good.
11. xecute-now - Inspect app help/details for system.fileName to confirm the documented param type does not communicate acceptance of negative/fraction counts.
12. defer - Exhaustively enumerate every changed command definition; broad sampling is required, but exhaustive runtime coverage is too large for this session.
13. defer - Compare local generated comparison script output; forbidden by deployed-only/no-local-verify operating rule.

Execution of Loop 2 items follows in subsequent entries/results files.

the observations and results that you make

Loop 2 is expected to focus on validator gaps, structured/constrained params, and one output-format cross-check. Items 12 and 13 are deferred with explicit reasons.

---
---
## 2026-07-02 00:11:18 +01:00

- What you think you want to do and why

Finish Loop 2 execution and record which new ideas produced useful coverage or defects.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Executed Loop 2 validator and structured-param cases in the deployed generator; saved raw results to support/loop2-execute-now-results.json.
- Tested system.commonFileName(extension="txt") and system.commonFileName(extension="").
- Tested invalid system.networkInterface(interfaceType="bad") and interfaceSchema="bad".
- Tested invalid date.birthdate(max=18,min=65,mode="age") and date.birthdate(mode="nonsense").
- Tested invalid inance.accountNumber(length=0), length=-1, and length=1.5.
- Tested invalid string.fromCharacters(characters=[],length=4) and length=-1.
- Tested malformed internet.jwt(header=sample) and internet.jwt(payload=["sample"]).
- Tested invalid image.urlPicsumPhotos(blur=-1) and lur=20.
- Tested location.zipCode(state="CA") as an exposed-but-usage-example-unsupported param.
- Retested system.fileName(extensionCount=-1) and system.fileName(extensionCount=1.5) and wrote defects/DEFECT-001-system-filename-extensioncount-invalid.md.
- Recorded video evidence with Playwright to ideos/DEFECT-001-system-filename-extensioncount-invalid.webm and screenshot screenshots/defect-system-filename-extensioncount-video-final.png.
- Used the visible Output Format select to switch a representative schema to JSON and saved evidence to screenshots/loop2-json-output-positive.png.

the observations and results that you make

Loop 2 strengthened confidence in many validators: network enums, date bounds/mode, finance length, string character/length, JWT structured objects, and Picsum blur all reject invalid inputs with clear messages. system.commonFileName(extension="") falls back to common extensions; this may be intentional and was not filed. location.zipCode(state="CA") fails with a Faker locale-data error even though the param is exposed; because the PR marks the state arg as usage-example unsupported, this is documented as a suspicious behavior/follow-up risk rather than a confirmed defect. system.fileName(extensionCount=-1) and xtensionCount=1.5 remain repeatable confirmed defect behavior.

---
---
## 2026-07-02 00:11:39 +01:00

- What you think you want to do and why

Start Loop 3 by reviewing completed subagent logs and generating additional ideas from their gaps and suspicious findings. Execute every in-scope xecute-now item.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Loop 3 idea list:

1. xecute-now - Recheck the UX lane's suspicious 
umber.bigInt(min=1000,max=100) behavior in text mode with a clean schema.
2. xecute-now - Check 
umber.bigInt param dialog/help for min/max validation cues and generated params behavior.
3. xecute-now - Capture mobile docs table behavior for a changed parameter-heavy page (
umber or system).
4. xecute-now - Capture mobile generator/method-picker behavior for a parameter-heavy command.
5. xecute-now - Compare location.zipCode(state="CA") docs/help/runtime and classify as risk vs defect.
6. xecute-now - Sample person.firstName(sex="female") and person.fullName(sex="female") with multiple rows to assess the command-coverage lane's suspicious output note.
7. xecute-now - Inspect system.fileName app help for xtensionCount to see whether validation constraints are documented.
8. xecute-now - Exercise Faker/helper command coverage (helpers.arrayElement or another helper) because PR touched helper definitions.
9. xecute-now - Test removed/unsupported word.words(max=...) in addition to word.verb(max=...).
10. xecute-now - Test 
umber.bigInt numeric params supplied as quoted strings (min="10") to check validator/coercion behavior.
11. xecute-now - Test a non-CSV output format (MARKDOWN) with representative changed commands.
12. defer - Exhaustive mobile screen-reader traversal; useful but larger than the story-specific risk.

Execution of Loop 3 follows in the next actions/results.

the observations and results that you make

Loop 3 will prioritize unresolved suspicions and remaining required coverage categories: helper commands, mobile/accessibility evidence, removed params, quoted numeric params, and non-CSV output.

---
---
## 2026-07-02 00:14:42 +01:00

- What you think you want to do and why

Complete Loop 3 execution by recording outcomes from subagent-driven ideas, including rechecks of suspicious findings, helper-command coverage, mobile/help evidence, and new repeatable defects.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Executed Loop 3 command/runtime checks and saved raw results to `support/loop3-command-runtime-results.json`.
- Rechecked `number.bigInt(min=1000, max=100)` in a clean schema; it rejected correctly with `argument "min" must be less than or equal to argument "max"`.
- Rechecked `location.zipCode(state="CA")`; it consistently failed with Faker locale data missing for `location.postcode_by_state`.
- Sampled `person.firstName(sex="female")`, `person.fullName(sex="female")`, `person.firstName(sex="male")`, and `person.fullName(sex="male")`.
- Sampled Faker/helper commands `helpers.arrayElement(["red","green","blue"])` and `helpers.replaceSymbols("INV-###")`; both generated expected outputs.
- Tested removed/unsupported `word.words(max=3)`; it rejected with `unknown named argument "max"`.
- Tested quoted numeric params for `number.bigInt(min="10", max="20", multipleOf="2")`; it rejected with `argument "min" must be integer, not string`.
- Repeated the person sex-param test with 20 preview rows in JSON output; saved raw evidence to `support/loop3-person-sex-repeat-output.json` and screenshot `screenshots/defect-person-sex-parameter-ignored.png`.
- Recorded video evidence for the person sex-param defect to `videos/DEFECT-002-person-sex-parameter-not-applied.webm` and wrote `defects/DEFECT-002-person-sex-parameter-not-applied.md`.
- Captured mobile published docs evidence for `system.fileName(extensionCount)` at `screenshots/loop3-mobile-system-docs-extensioncount.png`.
- Captured mobile method picker/help evidence for `system.fileName` at `screenshots/loop3-mobile-method-picker-system-filename.png`.

the observations and results that you make

The UX-reported `number.bigInt` suspicion was not reproduced; clean text-mode validation works. Helper command coverage generated expected values. Removed `word.words(max=3)` is correctly rejected. Quoted numeric BigInt params are rejected as strings, which is consistent with typed validation. `location.zipCode(state="CA")` remains a suspicious follow-up risk because the param is exposed but currently fails due to missing locale data. A second repeatable defect was confirmed: `person.firstName` and `person.fullName` do not consistently honor `sex="female"` and `sex="male"`; generated output includes male-coded names in female columns and female-coded names in male columns. Mobile docs and method-picker evidence supports the `system.fileName(extensionCount)` defect because the UI/docs describe `extensionCount` as a count-like number with example `2` and no meaningful rationale for accepting negative or fractional values.

---
---
## 2026-07-02 00:14:58 +01:00

- What you think you want to do and why

Start the mandatory final review loop. Review the story requirements, PR summary and changed files, accumulated logs, coverage model, sampled command families, docs reviewed, examples tried, defects found, and remaining gaps. Generate at least 10 additional ideas, classify them, and execute all `execute-now` ideas before producing PDFs.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

Final review idea list:

1. `execute-now` - Refresh PR #294 metadata and changed-file list to ensure the review still reflects current PR state.
2. `execute-now` - Verify all required subagent logs exist and are non-empty.
3. `execute-now` - Verify every defect markdown has at least one referenced screenshot and video file present.
4. `execute-now` - Verify the published person docs contain `sex` parameter examples to support DEFECT-002's oracle.
5. `execute-now` - Verify the published system docs and method-picker help contain `extensionCount` only as a number/count example to support DEFECT-001's oracle.
6. `execute-now` - Recheck one clean `number.bigInt` positive case after mobile/responsive work to ensure browser state is not stale or broken.
7. `execute-now` - Recheck one invalid BigInt case after final review to ensure validator remains represented in final coverage.
8. `execute-now` - Confirm current screenshots folder contains only images that are referenced in markdown or will be referenced in the final report.
9. `execute-now` - Confirm current docs/pages reviewed list includes all changed domain docs from the PR's docs surface.
10. `execute-now` - Check whether final report has no absolute local links; links should be relative.
11. `defer` - Exhaustively retest every one of the 77 comparison-report commands; broad sampling has been achieved, but exhaustive runtime checking is beyond the requested exploratory session.
12. `defer` - Upload local videos to GitHub issues; user explicitly excluded videos from attachment evidence and videos are local-only evidence under this repo's guardrails.

Execution follows in the final review results files and next log entry.

the observations and results that you make

The final loop is focused on both additional deployed checks and artifact integrity so the package is usable by future agents and GitHub follow-up.

---
---
## 2026-07-02 00:16:22 +01:00

- What you think you want to do and why

Complete the mandatory final review loop by recording final execution results and stop/coverage rationale before report collation and PDF generation.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Refreshed PR #294 metadata using `gh pr view 294 --repo eviltester/grid-table-editor`; saved `support/final-pr-294.json`.
- Verified six subagent logs are present and non-empty in `logs/`.
- Verified defect screenshot references exist and direct video files exist in `videos/`.
- Verified published person docs contain `person.firstName(sex="female")` and `person.fullName(..., sex="female")` examples.
- Verified published system docs contain `extensionCount` description for `system.fileName` as a numeric count with example `2`.
- Opened a clean final-review browser context at `https://eviltester.github.io/grid-table-editor/site/generator.html`.
- Switched to schema text mode and ran final smoke checks:
  - `Big: number.bigInt(min=10, max=20, multipleOf=2)` generated output.
  - `Bad: number.bigInt(min=20, max=10)` rejected with `argument "min" must be less than or equal to argument "max"`.
- Saved final smoke results to `support/final-review-runtime-smoke.json`.
- Checked screenshots against markdown references and removed one unreferenced early-hypothesis screenshot: `defect-lorem-words-count-unknown.png`.

the observations and results that you make

The PR metadata remains open with 81 changed files. Required subagent logs exist. Each confirmed defect has screenshot and video evidence. The docs reviewed list covers all changed domain docs plus representative date/finance/string/science pages. Final BigInt smoke confirms both positive and invalid paths after the longer session. The screenshot folder now contains only images referenced by markdown files or final report content. Stopping is justified because three loops plus a final review loop are complete, broad command-family coverage has been demonstrated, multiple subagent lanes completed, and the final loop produced confirmation and artifact-integrity checks rather than a stream of new defect patterns.

---
---
## 2026-07-02 00:19:58 +01:00

- What you think you want to do and why

Package the final deliverables, export PDFs, create the README, and complete GitHub issue follow-through requested for the testing activity.

the actions you take - include urls, steps and data that you use, describe any UI interactions that you make

- Updated `issue-286-test-report.md` with final coverage, loop summaries, defects, risks, deferred ideas, recommendation, and GitHub follow-through.
- Created `test-logs-and-defects.md` by collating the main log, all six subagent logs, and both defect markdown files.
- Generated `issue-286-test-report.pdf` with pandoc.
- Generated `test-logs-and-defects.pdf` with pandoc from a sanitized support copy to remove a control character copied from tool output; the required collated markdown remains intact.
- Created `README.md` with artifact descriptions and recommended reading order.
- Created GitHub parent testing issue: https://github.com/eviltester/grid-table-editor/issues/302
- Created defect subissues:
  - https://github.com/eviltester/grid-table-editor/issues/303
  - https://github.com/eviltester/grid-table-editor/issues/304
- Linked #303 and #304 as subissues of #302 using GitHub GraphQL `addSubIssue`.
- Tidied screenshots by removing an unreferenced early-hypothesis screenshot.

the observations and results that you make

All requested local deliverables are present. The two confirmed defects each have markdown, screenshot evidence, and local video replay. GitHub issue follow-through is complete with parent issue and linked subissues. GitHub CLI/API in this environment did not provide a direct issue-attachment upload flow, so issue bodies include reproduction details and local screenshot evidence filenames; videos remain local-only evidence as required by repository guardrails.

---



---


# Source: logs/command-coverage-test-log.md

---
## 2026-07-02T00:09:07.2487879+01:00

- I want to finish the command coverage and example execution lane with broad deployed-environment sampling across the changed command families, using published docs as the help/docs oracle and the deployed generator preview as the runtime oracle.

Actions taken:

- Read the session goal prompt and main report for issue 286 / PR 294 before testing:
  - `../issue-286-session-goal-prompt.md`
  - `../issue-286-test-report.md`
- Used only the deployed application and published deployed docs; no local target repo builds, package-manager commands, repo tests, or verify commands were run.
- Opened and interacted with the deployed generator:
  - `https://eviltester.github.io/grid-table-editor/generator.html`
  - Switched to `Edit as Text`.
  - Used the schema textarea and `Preview` button to generate CSV preview output for 10 rows per batch.
- Fetched and inspected deployed published docs pages for examples and command inventory:
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/airline`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/git`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/location`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/lorem`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/person`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/system`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/word`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/date`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string`
  - Attempted `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/science`; this lane could not fetch it because HTTPS transport failed, so science runtime coverage was deferred.
- Techniques and heuristics used:
  - Exploratory testing: broad sampling followed by targeted batches based on what the docs exposed.
  - Risk-based testing: focused on families called out in the changed surface inventory and PR/story scope.
  - Equivalence partitioning: mixed default examples, constrained values, enum-like parameters, ranges, booleans, arrays, and object/string parameters.
  - Boundary-oriented spot checks: short lengths, fixed counts, numeric min/max, precision, and date ranges.
  - Consistency/oracle checking: compared preview output shape against documented intent.
  - Documentation testing: checked whether deployed docs exposed representative examples and whether runtime accepted those examples.

Runtime batch 1 schema and observations:

```text
aircraft_type
airline.aircraftType
flight_default
airline.flightNumber()
flight_len4
airline.flightNumber(length=4, addLeadingZeros=true)
record_locator
airline.recordLocator(allowNumerics=true)
seat_wide
airline.seat(aircraftType="widebody")
image_data
image.dataUri(width=320, height=240, color="red", type="svg-base64")
image_person
image.personPortrait(sex="female", size=128)
image_picsum
image.urlPicsumPhotos(width=320, height=240, grayscale=true, blur=3)
git_sha7
git.commitSha(length=7)
```

- `airline.aircraftType` returned plausible values such as `regional`, `widebody`, and `narrowbody`.
- `airline.flightNumber()` returned variable-length numeric strings; the default example executed.
- `airline.flightNumber(length=4, addLeadingZeros=true)` returned four-digit values such as `1227`, `7961`, `4686`, `8081`, and `3095`.
- `airline.recordLocator(allowNumerics=true)` returned six-character alphanumeric locators such as `9KJ2UU`, `5VKZJY`, `AVUH8U`, and `W7SPHY`; numerics appeared as expected.
- `airline.seat(aircraftType="widebody")` returned plausible seat values such as `4C`, `39C`, `8F`, `37J`, `53J`, and `60B`.
- `image.dataUri(width=320, height=240, color="red", type="svg-base64")` returned `data:image/svg+xml;base64,...`; decoded visible content in the generated URI included width `320`, height `240`, fill `red`, and text `320x240`.
- `image.personPortrait(sex="female", size=128)` returned URLs under `faker-js/assets-person-portrait/female/128/...jpg`.
- `image.urlPicsumPhotos(width=320, height=240, grayscale=true, blur=3)` returned URLs such as `https://picsum.photos/seed/FtTNTZbE7/320/240?grayscale&blur=3`.
- `git.commitSha(length=7)` returned seven-character hex-like strings such as `bef39e7`, `7701815`, `d9ba010`, `547ffbd`, and `9ac2be5`.

Runtime batch 2 schema and observations:

```text
display_name
internet.displayName(firstName="Ada", lastName="Lovelace")
email_provider
internet.email(firstName="Ada", lastName="Lovelace", provider="example.com")
http_success
internet.httpStatusCode(types=["success"])
ipv4_private
internet.ipv4(network="private-a")
person_full
person.fullName(firstName="Ada", lastName="Lovelace", sex="female")
person_first_f
person.firstName(sex="female")
sex_type_no_generic
person.sexType(includeGeneric=false)
word_noun5
word.noun(length=5)
word_words5
word.words(count=5)
word_any
word.adjective(strategy="any-length")
```

- `internet.displayName(firstName="Ada", lastName="Lovelace")` returned display names based on Ada/Lovelace, for example `Ada85`, `Ada_Lovelace`, and `Ada.Lovelace31`.
- `internet.email(firstName="Ada", lastName="Lovelace", provider="example.com")` returned addresses ending in `@example.com`, for example `Ada_Lovelace1@example.com` and `Ada.Lovelace@example.com`.
- `internet.httpStatusCode(types=["success"])` returned 2xx status codes such as `201`, `203`, `204`, `205`, `207`, `208`, and `226`.
- `internet.ipv4(network="private-a")` returned `10.x.x.x` addresses, matching private class A intent.
- `person.fullName(firstName="Ada", lastName="Lovelace", sex="female")` returned mostly `Ada Lovelace`, with variants including `Ada Lovelace Sr.` and `Miss Ada Lovelace`; these may be acceptable faker suffix/prefix behavior but merit a tighter oracle check.
- `person.firstName(sex="female")` accepted the parameter and returned names, but outputs included names I would want a human/product oracle to inspect (`Sven`, `Omari`, `Bridget`) before classifying as a defect.
- `person.sexType(includeGeneric=false)` returned only `female` and `male` in this sample.
- `word.noun(length=5)` returned five-character words such as `pupil`, `drive`, `climb`, `riser`, and `dwell`.
- `word.words(count=5)` returned five words per row.
- `word.adjective(strategy="any-length")` returned adjectives of varied lengths such as `showy`, `flustered`, `sophisticated`, and `official`.

Runtime batch 3 schema and observations:

```text
number_bigint_range
number.bigInt(min=100, max=1000)
number_int_range
number.int(max=10, min=1)
finance_amount
finance.amount(min=1, max=10)
date_between
date.between(from=1577836800000, to=1609372800000)
string_upper
string.alpha(length=5, casing="upper")
location_country3
location.countryCode(variant="alpha-3")
location_lat_prec
location.latitude(max=10, min=1, precision=1)
lorem_words5
lorem.words(wordCount=5)
system_file2
system.fileName(extensionCount=2)
system_network_mac
system.networkInterface(interfaceType="en", interfaceSchema="mac")
```

- `number.bigInt(min=100, max=1000)` returned integer-like values between 100 and 1000, for example `698`, `581`, `967`, and `139`.
- `number.int(max=10, min=1)` returned values from 1 to 9 in the 10-row sample; all were within range.
- `finance.amount(min=1, max=10)` returned decimal amounts in range, for example `7.83`, `5.44`, `1.75`, and `3.11`.
- `date.between(from=1577836800000, to=1609372800000)` returned ISO timestamps within calendar year 2020, for example `2020-07-12T05:32:44.604Z` and `2020-12-08T13:47:44.285Z`.
- `string.alpha(length=5, casing="upper")` returned five uppercase letters such as `BOBCK`, `DIBXL`, `WTYGG`, and `ZBVTJ`.
- `location.countryCode(variant="alpha-3")` returned three-letter codes such as `GEO`, `ZWE`, `UZB`, `SWE`, `ARG`, and `FRA`.
- `location.latitude(max=10, min=1, precision=1)` returned numeric values between 1 and 10; examples included `6.7`, `1.5`, `9.4`, `1`, and `9.7`. `1` may be a valid one-decimal precision rendering without a trailing `.0`.
- `lorem.words(wordCount=5)` returned five-word strings.
- `system.fileName(extensionCount=2)` returned filenames with two extension segments, for example `ouch.php.xlt`, `rigidly_meaty_even.img.3g2`, and `because_likely.jar.jpe`.
- `system.networkInterface(interfaceType="en", interfaceSchema="mac")` returned interface names such as `enx899440eafc52` and `enxdd5aff746aed`. These look consistent with Linux interface names derived from MAC-like hex but should be compared against intended docs wording if `interfaceSchema="mac"` is expected to expose colon-delimited MACs.

Coverage performed:

- Sampled with runtime execution: airline, git, image, internet, location, lorem, number, person, system, word, plus representative date, finance, and string.
- Sampled from published docs and runtime: default examples, parameterized examples, constrained parameters, booleans, arrays, string enums, numeric ranges, date ranges, generated URLs, generated data URIs, and generated structured-looking values.
- Published docs reviewed: airline, git, image, internet, location, lorem, number, person, system, word, date, finance, string. Science docs fetch was attempted but failed in this lane.
- Deferred or thin coverage:
  - Science: docs fetch failed; no runtime sample was executed because I did not want to guess syntax.
  - Removed/deprecated commands: no explicit deprecated-command list was available to this lane from deployed docs alone.
  - Method picker command discovery: runtime execution used text schema mode; method-picker UI consistency should be handled by UX/docs lanes.
  - High-volume statistical validation: only 10-row previews were used per batch, enough for smoke/oracle checks but not distribution-level validation.

Findings:

- No repeatable confirmed defect was found in this command-coverage lane.
- Suspected follow-up risk: `person.firstName(sex="female")` returned some names that appear male-coded or ambiguous (`Sven`, `Omari`, `Bridget` in the 10-row sample). This needs a stronger product/data oracle before being reported as a defect.
- Suspected follow-up risk: `person.fullName(firstName="Ada", lastName="Lovelace", sex="female")` can add suffix/prefix variants such as `Ada Lovelace Sr.` and `Miss Ada Lovelace`; this may be intentional Faker behavior but should be checked against documented parameter intent.
- Suspected docs/tooling risk: science published docs could not be fetched in this lane due HTTPS transport failure; another agent or browser route should verify whether the page exists and is linked correctly.
- Tooling note, not an app defect: Playwright MCP `fill` and one `click` call timed out while the action still took effect. I confirmed state by snapshots and preview output before logging observations.

Follow-up ideas:

1. Execute `science.*` examples through the browser after confirming the deployed docs page is reachable from normal navigation.
2. Repeat `person.firstName(sex="female")` with a larger preview count and compare output against Faker's intended female-name dataset.
3. Repeat `person.fullName(..., sex="female")` and check whether `Sr.` is expected when a female sex parameter is supplied.
4. Test `airline.recordLocator(allowVisuallySimilarCharacters=true)` and compare character classes with default and numeric-enabled variants.
5. Test `airline.seat(aircraftType="narrowbody")`, `widebody`, and any invalid/unknown aircraft type in the negative lane.
6. Test `internet.jwt(header={"value":"sample"})` and other object-parameter examples for parser/runtime consistency.
7. Test more array-parameter commands such as `internet.emoji(types=["food"])` and `internet.httpMethod(excludes="patch, TRACE")`.
8. Test `image.dataUri(type="svg-uri")`, `svg-base64`, and any documented bitmap-like options across output formats.
9. Test `number.float(multipleOf=0.5)` and `number.bigInt(multipleOf=7)` for range and divisibility.
10. Test `location.latitude` and `location.longitude` boundary combinations, including negative ranges and precision rendering.
11. Test `system.networkInterface(interfaceSchema="mac")` against docs wording to decide whether `enx...` output is correct or misleading.
12. Test output format switching (CSV, JSON, Markdown) with the same broad command schema to catch escaping/serialization regressions.
13. Test command examples through the method picker, not only text schema mode, to catch UI insertion or escaping issues.
14. Compare deployed docs examples against in-app help examples for airline, image, internet, number, and system.
15. Try old/removed command names from the PR changed surface if the main agent can provide a deprecated-command inventory, and confirm they are hidden or fail clearly.

---



---


# Source: logs/negative-validation-test-log.md

---
## 2026-07-02T00:09:00+01:00

- I want to complete the negative-validation lane against the deployed generator, focusing on malformed params, removed params, boundary values, and constrained/structured options from issue #286 / PR #294.

Actions:
- Read `../issue-286-session-goal-prompt.md` and `../issue-286-test-report.md` to align this lane with the planned negative-validation charter.
- Used only the deployed environment: https://eviltester.github.io/grid-table-editor/site/generator.html.
- Opened the deployed Generator page in a Playwright browser session and confirmed interaction with the live Schema text and Preview controls.
- Added and ran lane support runner `../support/negative-validation/negative-validation-runner.js`; saved raw/clean results to `../support/negative-validation/negative-validation-results.json` and suspicious results to `../support/negative-validation/negative-validation-suspicious-results.json`.
- Ran 38 Preview-flow cases using schema text mode. Each case used a single column name matching the case id and a command invocation as the rule.
- Repeated the two suspicious `system.fileName(extensionCount=...)` cases with `../support/negative-validation/repeat-filename-extension-count.js`; saved repeat output to `../support/negative-validation/repeat-filename-extension-count-results.txt` and screenshot evidence to `../screenshots/negative-validation-filename-extension-count-repeat.png`.
- Techniques/heuristics used: exploratory testing, risk-based testing from PR changed surfaces, equivalence partitioning, boundary analysis, negative testing, removed-parameter testing, malformed structured-parameter testing, constrained enum/list checking, and consistency/oracle checking against expected validator behavior.

Observations/results:
- Confirmed validators now reject the BigInt edge cases tested: `number.bigInt(min=10, max=1)`, `number.bigInt(multipleOf=0)`, `number.bigInt(multipleOf=-2)`, `number.bigInt(min=1.5, max=10)`, removed `number.bigInt(value=true)`, and impossible `number.bigInt(min=1, max=5, multipleOf=10)`. Error text was specific, e.g. min/max ordering, integer requirement, greater-than-zero, unknown named argument, and no valid multiple in range.
- Confirmed structured HTTP status validation: `internet.httpStatusCode(types=["redirect"])`, `types="success"`, `types=[]`, and `types=["success","teapot"]` all failed with specific messages about arrays, non-empty arrays, or allowed category values. Positive control `types=["success"]` generated data.
- Confirmed removed/deprecated word/lorem params are rejected: `word.noun(max=5)`, `word.words(max=5)`, `lorem.word(max=5)`, and `lorem.word(min=1, max=10)` all failed as unknown named arguments. Zero/negative count and length boundaries also failed: `word.words(count=0)`, `word.words(count=-1)`, `lorem.word(length=0)`, and `lorem.word(length=-1)`.
- Confirmed image dimension/type and constrained params mostly validate correctly: `image.dataUri(width=0, height=10)`, `image.dataUri(width=10, height=-1)`, `image.dataUri(type="png")`, `image.urlPicsumPhotos(width=-1)`, `image.urlPicsumPhotos(height=0)`, `image.urlPicsumPhotos(blur=11)`, `image.urlPicsumPhotos(grayscale="true")`, `image.personPortrait(size=100)`, and `image.personPortrait(sex="other")` all failed with specific validation messages. Positive controls for `image.dataUri(...)` and `image.urlPicsumPhotos(...)` generated data.
- Confirmed constrained person/system params reject invalid values: `person.fullName(sex="other")`, `person.sexType(includeGeneric="false")`, `system.networkInterface(interfaceType="eth", interfaceSchema="mac")`, and `system.networkInterface(interfaceType="en", interfaceSchema="uuid")` all failed with clear messages.
- Repeatable suspicious finding 1: `system.fileName(extensionCount=-1)` generated filenames with no validation error. Exact repeat steps: open deployed Generator, click `Edit as Text`, set schema text to `filename_negative_extension_count_repeat` then `system.fileName(extensionCount=-1)`, click `Preview`. Expected: reject negative extension count or document that negative counts intentionally mean no extension. Observed: output generated, e.g. `opposite`, `abacus_safely_now`, `beautifully_quickly`, with no message.
- Repeatable suspicious finding 2: `system.fileName(extensionCount=1.5)` generated filenames with no validation error. Exact repeat steps: open deployed Generator, click `Edit as Text`, set schema text to `filename_fraction_extension_count_repeat` then `system.fileName(extensionCount=1.5)`, click `Preview`. Expected: reject fractional extension count or document rounding/truncation behavior. Observed: output generated, e.g. `stage_er_warmhearted.conf`, `quit_tenderly.php`, `per_boo.ogx`, with no message.
- Screenshot recommendation: use `../screenshots/negative-validation-filename-extension-count-repeat.png` for the repeated `system.fileName(extensionCount=1.5)` state. For the negative count case, the repeat output file has exact generated values; a dedicated screenshot/video should be captured if promoted to a defect.
- Coverage completed: `number.bigInt`, `internet.httpStatusCode`, `word.words`, `word.noun`, `lorem.word`, `image.dataUri`, `image.urlPicsumPhotos`, `image.personPortrait`, `person.fullName`, `person.sexType`, `system.networkInterface`, and `system.fileName`.
---



---


# Source: logs/docs-consistency-test-log.md

---
## 2026-07-02T00:07:51.9859168+01:00

- What you think you want to do and why

Close the Docs/help/content consistency lane with deployed evidence. I want to record the published docs pages reviewed, the app help/method-picker areas compared, the runtime examples tried, and the remaining risks or follow-up ideas without turning this lane into broad command execution.

Actions:
- Reviewed these published docs pages under `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/`:
  - `airline`
  - `git`
  - `image`
  - `internet`
  - `location`
  - `lorem`
  - `number`
  - `person`
  - `science`
  - `system`
  - `word`
- Checked docs page presence and key changed terms:
  - `airline.flightNumber`, `length`, `addLeadingZeros`, `airline.recordLocator`, `allowNumerics`, `allowVisuallySimilarCharacters`
  - `git.commitDate`, `git.commitEntry`, `git.commitSha`, `refDate`, `eol`, `merge`, `length`
  - `image.dataUri`, `width`, `height`, `color`, `svg-base64`, `image.personPortrait`, `image.url`, `image.urlPicsumPhotos`
  - `internet.displayName`, `internet.exampleEmail`, `internet.httpStatusCode`, `types`, `clientError`, `internet.password`
  - `location.zipCode`, `format`, `state`
  - `lorem.word`, `length`, `strategy`
  - `number.bigInt`, `min`, `max`, `multipleOf`
  - `person.fullName`, `firstName`, `lastName`, `sex`, `person.sexType`
  - `system.fileName`, `extensionCount`, `system.networkInterface`, `interfaceType`, `interfaceSchema`
  - `word.words`, `count`, `word.adjective`, `word.sample`
- Investigated removed/stale parameter risks:
  - `word` docs did not show `max` for `word.words`; it showed `count`.
  - `lorem.word` section did not show `min` or `max`; it showed `length` and `strategy`.
  - `min`/`max` still appear elsewhere on the lorem page for other lorem commands such as `lorem.words`, so a whole-page text hit alone is not enough to call stale content.
- Checked comparison-report publication guesses:
  - `https://eviltester.github.io/grid-table-editor/site/docs/domain-faker-param-comparison/`
  - `https://eviltester.github.io/grid-table-editor/site/docs/domain-faker-param-comparison`
  - `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-faker-param-comparison`
  These were not confirmed as published docs routes; one returned 404 and others hit SSL/connection errors on retry attempts.
- Opened the deployed generator at `https://eviltester.github.io/grid-table-editor/site/generator.html` with Playwright CLI. First navigation hit `net::ERR_CONNECTION_RESET`; retry loaded the page with title `Data Generator - AnyWayData`.
- In the generator UI, selected field type `domain`, opened `Select domain command`, and compared method-picker help/details for:
  - `airline.flightNumber`
  - `airline.recordLocator`
  - `git.commitEntry`
  - `git.commitSha`
  - `image.dataUri`
  - `image.url`
  - `internet.httpStatusCode`
  - `location.zipCode`
  - `lorem.word`
  - `number.bigInt`
  - `person.fullName`
  - `system.fileName`
  - `system.networkInterface`
  - `word.words`
  - `helpers.arrayElement`
- Confirmed sampled method-picker help showed parameter details, parameter types, usage examples, and an `Open documentation` link. After selecting `number.bigInt`, the row-level docs link changed to `https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number`.
- Tried these deployed runtime examples from the app preview:
  - `number.bigInt(min=100, max=1000)` generated quoted CSV values `134`, `946`, `149`, `660`, `754`, `585`, `314`, `957`, `888`, `885`, all within the documented bounds.
  - `internet.httpStatusCode(types=["success"])` generated success-class values including `204`, `201`, `204`, `206`, `203`.
  - `word.words(count=5)` generated five-word strings such as `profitable SUV traffic shampoo wherever`.
  - `lorem.word(length=5)` generated five-character words such as `talis`, `pecus`, `dolor`, `theca`, `adhuc`.
- Stopped the Playwright browser session and removed July 1 / July 2 `.playwright-cli` scratch files created by this lane.

Observations/results:
- No confirmed docs/help/content consistency defect was found in this lane.
- Published docs and app method-picker help were broadly consistent for the sampled changed families. The sampled command help showed the new params introduced or clarified by PR #294, including `number.bigInt(min/max/multipleOf)`, `internet.httpStatusCode(types)`, `airline.flightNumber(length/addLeadingZeros)`, `system.networkInterface(interfaceType/interfaceSchema)`, and `word.words(count)`.
- The removed/stale parameter risk looks handled for the sampled sections: `lorem.word` no longer showed `min`/`max`, and `word.words` no longer showed `max`.
- The app help and runtime preview aligned for the four examples tried. These examples were selected as representative docs/help/runtime oracles, not as exhaustive command coverage.
- `location.zipCode` remains a documentation nuance: docs/help list both `state` and `format`, but visible examples only demonstrate default and `format`. This may be intentional because `state` support is locale-dependent, but it is worth noting as a possible clarity gap rather than a confirmed defect.
- `docs/domain-faker-param-comparison.md` is listed in changed files, but I did not confirm a published docs route for it. If the report is intended to be a repo/PR artifact only, this is fine. If users are expected to read it on the deployed docs site, the route/navigation should be checked by the main agent.
- Deployed docs/app access showed intermittent SSL/connection-reset behavior. Retries succeeded for the generator and the changed docs pages, so I treated this as environment/network flakiness rather than a content defect.
- Techniques/heuristics used: documentation testing, consistency/oracle checking, risk-based sampling from changed files, removed-parameter checks, example-based runtime comparison, docs navigation/link checking, and exploratory review of method-picker help.

Follow-up ideas:
- Execute every published example on `image.url`, `image.dataUri`, and `image.urlPicsumPhotos`, because image commands have long URL/data URI outputs that are easy to document but harder to visually validate.
- Check whether `location.zipCode(state="CA")` should have an example, warning, or intentional omission note.
- Validate `helpers.arrayElement(["A", "B", "C"])` and other changed faker/helper commands from the faker help surface, not just the mixed method picker list.
- Compare `science` docs and app help command names against the changed file naming, because the published page is grouped as science while changed command source includes chemical element/unit definitions.
- Check all `Open documentation` links for sampled method-picker commands, not just the selected `number.bigInt` row-level docs link.
- Run a removed-param negative check for `word.words(max=5)` and `lorem.word(max=5)` in the negative-validation lane to confirm user-facing error behavior.
- Compare examples containing arrays, strings, booleans, enum-constrained params, and numeric params for quote style consistency across docs and help.
- Check mobile/responsive readability of long help examples such as `image.dataUri` and `git.commitEntry`.
- Verify whether the comparison report should be linked from docs navigation, release notes, or remain PR-only.
- Review docs for duplicate/misleading command wording where source families were renamed or grouped differently, especially science/unit/chemicalElement and faker/helper surfaces.

---
## 2026-07-02T00:04:06.6700224+01:00

- What you think you want to do and why

Start the Docs/help/content consistency lane for issue 286 / PR 294 using only deployed/published sources. I want to align with the main session prompt and report, then compare published docs, deployed app method-picker help, and practical runtime examples for the changed command families.

Actions:
- Read `../issue-286-session-goal-prompt.md`.
- Read `../issue-286-test-report.md`.
- Read `../support/pr-294-files.txt` for changed-surface inventory already captured by the main session.
- Confirmed this lane log did not already exist, then created `logs/docs-consistency-test-log.md`.
- Confirmed Playwright CLI prerequisite with `npx --version`; result was `11.13.0`.

Observations/results:
- Scope is docs/help/content consistency across app and published docs for `eviltester/grid-table-editor` issue #286 / PR #294.
- Target deployed environment is `https://eviltester.github.io/grid-table-editor/site/`.
- Operating constraints observed: no local repo builds, no local verify, no package-manager tests, no target repo tests, and no code changes.
- Changed published docs families from support inventory: airline, git, image, internet, location, lorem, number, person, science, system, and word.
- Additional changed command/helper surfaces to keep in mind while sampling: date, finance, string, validators, compiler, faker helper keyword definitions, generated docs/comparison tooling, and command-help example plumbing.

---



---


# Source: logs/ux-regression-test-log.md

---
## 2026-07-02 00:04:09 +01:00

- What you think you want to do and why

Start the UX/usability workflow regression lane for issue #286 / PR #294 using only the deployed environment. The focus is generator/app navigation, schema input, method picker and help discoverability, example insertion/copy, error feedback, Generate completion behavior, and table/text preview flow.

Actions taken: read `issue-286-session-goal-prompt.md`, `issue-286-test-report.md`, the existing browser-proof snapshot in `support/00-browser-proof-snapshot.txt`, and the session PR/issue context listed in the main report. Created `support/ux-regression/` for lane-local browser driver snippets. Planned techniques: exploratory testing, risk-based workflow testing, state/flow modeling, consistency/oracle checking between visible help and runtime behavior, negative/error-feedback checks, usability heuristics for discoverability and feedback, and light keyboard/focus awareness where practical.

Observations/results: the main report is still in-progress and lists this lane as the owner for generator, method-picker, app workflow, and feedback behavior. The saved browser proof shows the deployed homepage and the `Use The Application` entry link. No local build, local verify, package-manager test, or target-repo test commands were run.

---
## 2026-07-02 00:09:32 +01:00

- What you think you want to do and why

Complete a focused deployed-only UX/workflow regression pass over app navigation, generator navigation, schema entry, method picker discoverability/help, example visibility, generation completion feedback, error feedback, and table/text preview. I want enough workflow evidence for the main agent to decide where to deepen testing without treating this as local code verification.

Actions taken: used Playwright CLI against `https://eviltester.github.io/grid-table-editor/site/` and `https://eviltester.github.io/grid-table-editor/site/app.html` only. Opened the deployed homepage, clicked through to the app, visited the Generator navigation link, returned to the app, toggled Instructions help, expanded Test Data, entered schema row data (`Column Name=Ticket`, `Field type=regex`, `Value / Regex=[A-Z]{2}[0-9]{3}`, `How Many=3`), clicked the actual Generate button via its deployed `data-role`, clicked Set Text From Grid and observed/handled its confirmation flow, switched to the JSON preview tab, opened the domain method picker, filtered for `number.bigInt`, inspected parameter details and usage examples, then used schema text mode with `BigNum: domain number.bigInt(min=1000,max=100)` to probe error feedback. Screenshots captured: `../screenshots/ux-regression-app-navigation.png`, `../screenshots/ux-regression-generator-page.png`, `../screenshots/ux-regression-instructions-help.png`, `../screenshots/ux-regression-test-data-panel.png`, `../screenshots/ux-regression-regex-generate.png`, `../screenshots/ux-regression-set-text-from-grid.png`, `../screenshots/ux-regression-json-preview.png`, `../screenshots/ux-regression-picker-number-bigint-help.png`, and `../screenshots/ux-regression-schema-text-invalid-bigint.png`. Supporting browser snippets are under `../support/ux-regression/`.

Observations/results: deployed browser interaction worked. Homepage-to-app navigation and the Generator nav link both loaded. Instructions help and Test Data panel were discoverable. Regex schema generation completed and displayed `Generate complete. Grid updated.` with rows in the grid. Set Text From Grid opened a blocking confirmation modal with text `Do you want to Set Text From Grid?`; this is useful feedback, but it also blocked subsequent interactions until explicitly dismissed. The confirmation dialog and other hidden dialogs produce duplicated `OK`/`Cancel` buttons in the DOM, which is a UX/accessibility follow-up risk. The method picker was discoverable from the domain schema row, and filtering `number.bigInt` showed command details, parameter details (`min`, `max`, `multipleOf`), parameter types, multiple usage examples, and an Open documentation affordance. The visible method-picker list and details panel looked usable on desktop, though dense. A suspicious behavior was observed in schema text mode: `BigNum: domain number.bigInt(min=1000,max=100)` generated one row and showed `Generate complete. Grid updated.` instead of obvious error feedback; the grid text showed a transformed-looking value `domain number8bigIntmin=1000,max=100`. This should be repeated by the negative-validation lane or main agent because the schema text syntax may have been invalid setup rather than a confirmed app defect.

Findings for main agent: no split defect file created by this lane. Confirmed UX coverage includes navigation, help toggles, schema form entry, Generate completion, Set Text From Grid confirmation behavior, format preview navigation, method-picker filtering, and method-picker help/example visibility. Suspicious risks: accessible-name ambiguity around Generate because the help icon also matches generate-related text; blocking Set Text confirmation plus duplicated hidden modal buttons; schema text mode can fail non-obviously or fall through to generation when command-like text is malformed; method-picker help is rich but dense and may need keyboard/mobile review.

New ideas: 1. Repeat schema text `number.bigInt(min=1000,max=100)` with the exact documented schema syntax and classify whether generation is valid or an error-feedback defect. 2. Apply `number.bigInt` from the picker using the `Apply` button, then fill Params `(min=100,max=1000)` and generate. 3. Test picker usage examples for an explicit insert/copy affordance; if none exists, decide whether this is expected. 4. Verify `Open documentation` from the picker opens the correct `number.bigInt` docs. 5. Keyboard-test method picker filter, result selection, Cancel, Apply, and Escape. 6. Check whether screen readers encounter duplicate hidden `OK`/`Cancel` buttons. 7. Exercise Set Grid From Text after editing JSON preview text. 8. Test Generate after clearing a required schema field and observe error placement. 9. Test Help icons near Generate, Grid to Enum Schema, schema row, and Import/Export for focus and dismiss behavior. 10. Verify Copy from preview gives visible success/failure feedback when clipboard permission is denied. 11. Switch import/export formats after generation and verify preview stays synchronized. 12. Try method picker category chips `number`, `internet`, `image`, `person`, and `word` after using search. 13. Run the same workflow at a smaller viewport to see whether the method-picker details and examples remain reachable. 14. Try a docs example from `internet.httpStatusCode` through the picker Params field. 15. Retest the Generate button accessible-name ambiguity with an accessibility tool or focused snapshot.

---



---


# Source: logs/responsive-accessibility-test-log.md

---
## 2026-07-02T00:10:19+01:00

- I want to close the responsive/mobile and accessibility lane with deployed-only evidence across app, generator, method picker, parameter editor, and docs viewports.

Actions:

- Attempted Chrome DevTools MCP first, but it was blocked by an existing Chrome profile lock. Attempted Playwright MCP next, but it also hit a browser profile launch issue. Continued with Playwright CLI against deployed pages only, without running local repo builds, local verify, package-manager tests, or target repo tests.
- Proved deployed browser access and interaction:
  - Opened https://eviltester.github.io/grid-table-editor/site/.
  - Clicked "Use The Application".
  - Confirmed navigation to https://eviltester.github.io/grid-table-editor/site/app.html.
  - Clicked the app's "Generator" link; the click timed out waiting for navigation completion, but the page did land on https://eviltester.github.io/grid-table-editor/generator.html.
- Tested viewports:
  - Mobile/narrow: 390x844.
  - Tablet-ish: 768x1024.
  - Desktop: 1366x768.
- Tested generator/mobile command workflow:
  - Changed first schema row field type to `domain`.
  - Opened "Select domain command".
  - Filtered method picker to `number.float`.
  - Reviewed method details, parameter details, parameter types, and usage examples.
  - Applied `number.float`.
  - Opened "Edit params for number.float".
- Tested keyboard/focus sampling:
  - With focus in the method picker filter, pressed Tab repeatedly.
  - Captured focus sequence to `../support/responsive-accessibility/method-picker-mobile-tab-sequence.txt`.
- Tested docs/mobile readability:
  - Opened https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number/.
  - Reviewed mobile, tablet-ish, and desktop renderings.
  - Compared `number.float` docs table/examples against the app method picker surface.
- Saved screenshots:
  - `../screenshots/responsive-accessibility-generator-mobile-domain-row.png`
  - `../screenshots/responsive-accessibility-method-picker-mobile-open.png`
  - `../screenshots/responsive-accessibility-number-float-mobile-help.png`
  - `../screenshots/responsive-accessibility-number-float-param-editor-mobile.png`
  - `../screenshots/responsive-accessibility-number-docs-mobile.png`
  - `../screenshots/responsive-accessibility-number-docs-mobile-after-reload.png`
  - `../screenshots/responsive-accessibility-number-docs-tablet.png`
  - `../screenshots/responsive-accessibility-number-docs-desktop.png`
  - `../screenshots/responsive-accessibility-generator-tablet.png`
  - `../screenshots/responsive-accessibility-generator-desktop.png`
- Saved support metrics:
  - `../support/responsive-accessibility/method-picker-mobile-open-metrics.txt`
  - `../support/responsive-accessibility/method-picker-mobile-tab-sequence.txt`
  - `../support/responsive-accessibility/number-docs-mobile-metrics.txt`
  - `../support/responsive-accessibility/number-docs-mobile-after-reload-metrics.txt`
  - `../support/responsive-accessibility/number-docs-desktop-metrics.txt`
  - `../support/responsive-accessibility/generator-desktop-metrics.txt`

Observations/results:

- Root/app/generator deployed pages were reachable and interactive. No local target repo commands or local tests were run.
- The site root did not show the visible Docusaurus "site did not load properly" warning seen in a previous lane run. Current root accessibility snapshot showed named nav links, skip link, theme toggle, App link, Docs link, and main content.
- App page accessibility snapshot had named controls for grid actions, filter, unique column names, import/export controls, options, and preview editor. It reported one console error and then one warning, but this lane did not triage console causes.
- Generator desktop and tablet pages rendered without page-level horizontal overflow in sampled screenshots. Desktop metrics showed `body.clientWidth: 1350`, `body.scrollWidth: 1350`, and `buttonsMissingNames: 0`.
- Mobile generator domain row remained usable and had named controls: `Column Name`, `Field type`, `Select domain command`, `Domain data help`, `Params`, and disabled "Edit params for selected command".
- Mobile method picker had no unnamed buttons in sampled metrics. It exposed `Filter methods`, category buttons, listbox "Methods", method details, and Apply/Cancel actions in the accessibility tree.
- Mobile method picker remains high-friction for keyboard users. After filtering to `number.float`, Tab moved through category chips in order: All, Core, airline, airplane, airport, animal, autoIncrement, book. Results and Apply are reachable, but the chip list creates substantial keyboard travel for a large command inventory.
- Mobile method picker layout is dense but readable for `number.float`. It showed the long description, four parameter rows (`fractionDigits`, `max`, `min`, `multipleOf`), parameter types, and seven usage examples. The detail pane is a short internal scroll region, so reading examples requires careful in-pane scrolling.
- Mobile `number.float` parameter editor is functionally accessible in the snapshot: value fields are named `fractionDigits value`, `max value`, `min value`, and `multipleOf value`; disabled optional checkboxes have names such as `Optional fractionDigits`. However, the visual screenshot shows a cramped/awkward dialog placement lower in the page rather than a polished centered modal overlay. The controls are present, but discoverability and visual confidence are weak on narrow screens.
- Mobile docs initially rendered in a suspicious unstyled/navigation-expanded state in `responsive-accessibility-number-docs-mobile.png`: raw links, bullets, duplicated theme controls, and expanded sidebar content dominated the viewport. A reload at the same viewport hit `ERR_CONNECTION_RESET` but recovered to a styled docs page in `responsive-accessibility-number-docs-mobile-after-reload.png`. Treat this as suspicious/transient unless another agent can reproduce cleanly.
- Styled mobile docs are readable overall, but generated parameter tables require internal horizontal scrolling. After reload, page-level width stayed contained (`body.clientWidth: 390`, `body.scrollWidth: 390`), while several tables exceeded their own client width, e.g. first table `clientWidth: 358`, `scrollWidth: 407`; `number.float` table `clientWidth: 358`, `scrollWidth: 449`. This hides part of the `Description` column on first view.
- Desktop docs had no sampled table overflow (`tableOverflows: []`) and showed expected headings: `number Domain`, `Faker Documentation`, `Methods`, `number.bigInt`, `number.binary`, `number.float`.
- Tablet docs and generator screenshots were captured for comparison; no immediate tablet-only blocker was observed in the sampled first viewport.
- Help/label naming is generally strong in the sampled flow: repeated "Show help" buttons are generic in some contexts, but command-specific controls like "Domain command help: number.float" and "Edit params for number.float" are clear.
- Live/status surfaces are present in snapshots: generator row status reported "Row 1: column name is required"; parameter editor status "Generated params" was exposed. I did not perform a screen-reader live-announcement verification.

Coverage summary:

- Covered app landing from deployed root, app page accessibility snapshot, generator mobile/tablet/desktop, method picker mobile, `number.float` help/details/examples, parameter editor mobile, number domain docs mobile/tablet/desktop, keyboard Tab sampling, labels/names spot checks, horizontal overflow metrics, and docs readability checks.
- Command families directly sampled: `number` through `number.float`, with docs also exposing `number.bigInt`, `number.binary`, `number.hex`, `number.int`, `number.octal`, and `number.romanNumeral`.
- Other changed families visible but not deeply tested in this lane: airline, git, image, internet, location, lorem, person, system, word, helpers/faker. These should be covered by command, negative, and docs consistency lanes.
- Not covered in depth: Lighthouse audit, automated axe-style contrast checks, actual screen reader announcements, touch gestures on a physical device, and full keyboard traversal to every dialog action.

Findings and risks to hand back:

- Potential defect candidate: Mobile docs can temporarily render in an unstyled/navigation-expanded state; evidence captured in `responsive-accessibility-number-docs-mobile.png`, but repeatability was not proven because reload recovered styling.
- UX/accessibility risk: Mobile docs parameter tables hide part of the table on first view and require horizontal scrolling. This is repeatable after reload on the number docs page.
- UX/accessibility risk: Mobile method picker keyboard path is long because focus traverses many category chips after filtering before results/actions.
- UX risk: Mobile parameter editor is accessible by names, but the narrow visual layout for `number.float` feels cramped and dialog placement/presentation is not confidence-inspiring.
- Low-risk positive: Sampled buttons on generator desktop and mobile method picker had accessible names; no unnamed buttons were found in sampled metrics.

Follow-up ideas:

1. execute-now for main agent: Re-test the mobile docs unstyled state from a fresh browser context to determine if it is repeatable or a transient network/CSS load failure.
2. execute-now for main agent: Decide whether mobile docs table horizontal scrolling should be raised as a UX defect for generated parameter docs.
3. execute-now for main agent: Repeat parameter-editor mobile checks for `internet.httpStatusCode`, `image.url`, `image.dataUri`, `location.zipCode`, and `string.counterString`.
4. execute-now for main agent: Verify whether method picker can skip category chips after filtering, e.g. with ArrowDown, Enter, or a documented keyboard shortcut.
5. execute-now for main agent: Check Escape/Close/Cancel focus return from method picker and parameter editor.
6. defer: Run Lighthouse accessibility/mobile audits once Chrome DevTools MCP profile lock is cleared.
7. defer: Run a contrast-focused pass for method picker selected item, chip focus state, disabled controls, and modal footer buttons.
8. defer: Test with browser zoom at 200% and 400% on docs and generator help dialogs.
9. defer: Test actual touch scrolling in method detail pane and docs tables on a mobile device or touch-emulated session.
10. defer: Verify screen reader announcements for row validation status and generated params status.
11. defer: Review generic repeated "Show help" names in dense contexts to see if more specific accessible names would reduce ambiguity.
12. defer: Check whether docs table descriptions can wrap into card-style/mobile rows instead of horizontal scrolling.

Stopping note:

- This lane has covered the requested responsive/mobile/accessibility surfaces broadly enough for a subagent handoff: mobile/narrow, tablet-ish, desktop, keyboard/a11y heuristics, labels/names/status surfaces, help disclosure usability, horizontal overflow, and docs readability. Remaining work is best handled by follow-up defect confirmation or other lanes.

---
## 2026-07-02T00:04:12+01:00

- I want to establish this responsive/mobile and accessibility lane from the current session prompt and report before using browser tooling, so the log starts with scope, constraints, and planned heuristics.

Actions:

- Read `../issue-286-session-goal-prompt.md`.
- Read `../issue-286-test-report.md`.
- Confirmed target story and PR:
  - Story: https://github.com/eviltester/grid-table-editor/issues/286
  - PR: https://github.com/eviltester/grid-table-editor/pull/294
  - Deployed environment: https://eviltester.github.io/grid-table-editor/site/
- Confirmed this lane is Subagent 5: Responsive/mobile and accessibility review.
- Confirmed constraints:
  - Use deployed pages only for behavior.
  - Do not run local repo builds, local verify, package-manager tests, or target repo tests.
  - Use Chrome DevTools/Lighthouse MCP against deployed pages only.
- Planned coverage:
  - Mobile/narrow, tablet-ish, and desktop viewports.
  - App, generator, method picker, help/parameter editor, and changed docs surfaces.
  - Keyboard navigation/focus basics.
  - Accessible names, labels, status/live-region heuristics.
  - Help disclosure usability and command metadata readability.
  - Horizontal overflow and docs readability.
- Planned techniques:
  - Exploratory testing, risk-based testing, responsive testing heuristics, accessibility heuristics, keyboard testing, documentation testing, and consistency/oracle checking between app help and published docs.

Observations/results:

- The main report identifies PR #294 as a wide command metadata/docs/help change with risk concentrated around parameter metadata, validators, help examples, runtime mapping, and docs/app consistency.
- For this lane, the highest-risk surfaces are the generator command picker, parameter help/editor dialogs, docs tables/code examples, and narrow-screen layouts because nearly all command definitions changed.
- No local verification or build/test commands have been run.

---



---


# Source: logs/change-surface-risk-test-log.md

---
## 2026-07-02T00:30:00+01:00

- I want to complete the change-surface/comparison-tooling risk lane by using the current session artifacts plus GitHub/published PR information to identify gaps that should steer deployed testing, without running any local target-repo builds, verification, package-manager tests, or repo tests.

Actions:

- Read the session prompt at `../issue-286-session-goal-prompt.md`.
- Read the in-progress report at `../issue-286-test-report.md`.
- Read the PR changed-file inventory at `../support/pr-294-files.txt`.
- Read existing subagent logs in this session:
  - `docs-consistency-test-log.md`
  - `ux-regression-test-log.md`
  - `responsive-accessibility-test-log.md`
- Used GitHub connector read-only tools for PR #294:
  - Fetched PR discussion comments and review timeline for `eviltester/grid-table-editor#294`.
  - Fetched review-thread metadata for `eviltester/grid-table-editor#294`.
  - Fetched the current PR-branch `scripts/compare-domain-faker-params.mjs` from `286-expand-command-params`.
  - Fetched the current PR-branch `docs/domain-faker-param-comparison.md` from `286-expand-command-params`.
- Reviewed the CodeRabbit walkthrough summary and review comments. It characterizes the PR as aligning Faker-backed domain keyword parameter metadata with generated help docs, adding comparison tooling/tests, adding BigInt bounds validation, and changing lorem/word parameter shapes.
- Reviewed Copilot/Greptile/CodeRabbit review threads:
  - BigInt string/bigint validator concern on `number.bigInt`.
  - `--check` not failing on `domainOnlyParams` in `scripts/compare-domain-faker-params.mjs`.
  - Command-help zero-arg example coverage suppressed by unsupported params such as `location.zipCode.state`.
  - Redundant `location.zipCode.state` special-case in command-help example support.
- Verified from the published branch file that `scripts/compare-domain-faker-params.mjs` now has `hasParamComparisonFailures(rows)` and that `runCli()` uses it for `--check`, so the comparison-tooling branch currently appears to enforce both `missingInDomain` and `domainOnlyParams`.
- Verified from the published branch comparison report that it compares 77 Faker option-backed domain commands, with zero missing-in-domain and zero domain-only param rows.

Observations/results:

- No local target-repo build, verify, package-manager test, or repo test command was run. This lane used local session artifacts and GitHub/published branch files only.
- Current session coverage state: only docs-consistency, UX-regression, and responsive-accessibility logs exist so far. There is not yet a command-coverage log or negative-validation log in this dated folder, so broad command behavior and invalid-argument behavior are still high-priority gaps.
- Highest changed-file risk areas:
  - `lorem` and `word` command definitions/docs: the PR intentionally removes old word-length-style params and changes semantics to `length`, `strategy`, and `count`; this is high risk for stale docs, stale app help, or runtime mismatch.
  - `number.bigInt`: new min/max/multipleOf metadata and validation had multiple review comments; deployed negative testing should confirm integer-only validation, min/max order, multipleOf positivity, and runtime output constraints.
  - `location.zipCode`: `state` is present in the comparison report but was called out as unsupported for usage examples, so it is a risk for docs/app help showing a param that examples or runtime flows cannot safely exercise.
  - `image.*`, `internet.*`, `system.*`, `string.*`, `finance.*`, `date.*`, and `airline.*`: many command definitions changed but only some docs pages are in the explicit docs inventory, increasing risk that agents sample the obvious families and miss helper/structured/constrained params.
  - Shared validation/compiler/helper plumbing: `domainTestDataRuleValidator.js`, `testDataRulesCompiler.js`, `domain-keyword-arg-validators.js`, `domain-keywords.js`, and `faker-helper-keyword-definitions.js` create cross-command risk. A single parser/validator issue could affect many families.
  - Comparison tooling/reporting: the generated report is useful but only checks metadata parity with Faker declarations. It does not prove deployed docs, app help, method picker controls, example insertion, or runtime generation behavior.
- Review-comment risk areas that should influence deployed testing:
  - BigInt comments were withdrawn after narrowing arg types to `integer`, but deployed testing should still try quoted numeric strings, decimal values, booleans, negative bounds, `min > max`, and `multipleOf <= 0` to prove users see clear validation rather than silent runtime errors.
  - The `domainOnlyParams` `--check` concern appears fixed in the current branch, but it directly maps to the issue's defect class. Deployed testing should still probe old/domain-only params such as `word.*(max=...)` and `lorem.word(min/max)` because tooling parity does not guarantee deployed validation/help parity.
  - The command-help zero-arg example review thread points at commands with unsupported params. Deployed docs/help testing should include commands where all example-supported params are optional but one unsupported param exists, especially `location.zipCode`.
  - The comparison report includes 77 commands, but the changed-file list includes docs and definitions beyond the most visible story examples. The main agent should avoid calling coverage broad unless sampled families are recorded explicitly.
- Potentially under-covered command families or surfaces:
  - `string.alpha`, `string.alphanumeric`, `string.binary`, `string.hexadecimal`, `string.numeric`, `string.octal`, `string.sample`, `string.symbol`, `string.fromCharacters`, and `string.nanoid`.
  - `image.dataUri`, `image.personPortrait`, `image.url`, `image.urlPicsumPhotos`.
  - `internet.httpStatusCode`, `internet.password`, `internet.displayName`, `internet.exampleEmail`.
  - `system.fileName`, `system.networkInterface`.
  - `finance.accountNumber`, `finance.pin`, and date `between`/`betweens`.
  - `location.zipCode` with `format` and `state`.
  - `person.fullName` and `person.sexType`.
  - Changed docs page `science` appears in the docs inventory although no corresponding science keyword definition appears in `pr-294-files.txt`; this mismatch should be checked in published docs and report wording.

Execute-now ideas for the main agent:

1. Execute deployed `number.bigInt(min=2, max=10)`, `number.bigInt(min=10, max=2)`, `number.bigInt(min="2", max="10")`, `number.bigInt(multipleOf=0)`, and `number.bigInt(multipleOf=-1)` and record exact validation/output.
2. Execute deployed old/domain-only params: `word.adjective(max=5)`, `word.noun(min=2, max=5)`, `lorem.word(min=2, max=5)`, and confirm docs/help do not promote these stale shapes.
3. Execute deployed `location.zipCode(format="#####")` and `location.zipCode(state="CA")`; compare app help, published docs, and runtime behavior because review comments called out `state` as unsupported for examples.
4. Use the deployed method picker/param editor for `location.zipCode`, `number.bigInt`, `word.words`, and `lorem.word` to verify visible controls match published docs and branch comparison report names.
5. Sample changed string commands with structured/constrained params: `string.alpha(length=5, casing="upper")`, `string.numeric(length=5, allowLeadingZeros=true)`, and malformed `exclude` values.
6. Sample image commands with option params: `image.url(width=123, height=45)`, `image.urlPicsumPhotos(width=123, height=45, grayscale=true, blur=5)`, and invalid negative dimensions.
7. Sample internet commands with constrained params: `internet.httpStatusCode(types=["success"])`, invalid `types`, `internet.password(length=12, memorable=true, prefix="X")`.
8. Sample system commands: `system.fileName(extensionCount=2)` and `system.networkInterface(interfaceType="wifi", interfaceSchema="ipv4")`, then try invalid option values.
9. Sample finance/date commands that changed definitions but are easy to miss: `finance.accountNumber(length=8)`, `finance.pin(length=4)`, and date between/betweens examples from published docs.
10. Check the published `science` docs page against app command availability and PR changed files; note whether the docs changed without a matching keyword-definition change.
11. Compare the deployed published docs for `word`, `lorem`, `number`, `location`, and `string` against the branch comparison report names; flag any docs examples that use params absent from the report.
12. In final report coverage tables, list the comparison-report total of 77 commands and explicitly mark which were sampled, which were covered indirectly by docs/help review, and which were deferred.

Deferred items:

- Do not run `node scripts/compare-domain-faker-params.mjs --check`, `pnpm run verify:local`, local builds, or target-repo tests in this session unless the user explicitly changes the operating rules.
- Do not attempt to validate the comparison report against installed Faker declarations locally; use the published report and deployed behavior as the test oracle for this review.
- Full exhaustive execution of all 77 comparison-report commands is likely out of scope for this lane; main agent should use risk-based representative sampling and document deferrals.
- CodeRabbit/Greptile thread resolution state should be treated as guidance, not a guarantee. The final review should re-check the current PR discussion if publication is delayed.

---



---


# Source: defects/DEFECT-001-system-filename-extensioncount-invalid.md

# DEFECT-001: `system.fileName(extensionCount)` accepts negative and fractional counts

## Summary

The deployed generator accepts invalid `system.fileName(extensionCount)` values such as `-1` and `1.5` and generates filenames instead of rejecting the schema with a validation error.

## Environment

- Test environment: https://eviltester.github.io/grid-table-editor/site/generator.html
- Date tested: 2026-07-02
- Browser automation: Chrome DevTools MCP and Playwright video replay
- Story/PR under review: issue #286 / PR #294

## Reproduction Steps

1. Open https://eviltester.github.io/grid-table-editor/site/generator.html.
2. Click `Edit as Text`.
3. Paste this schema:

```text
NegExt: system.fileName(extensionCount=-1)
FracExt: system.fileName(extensionCount=1.5)
NormalExt: system.fileName(extensionCount=2)
```

4. Set `Preview Items Count` to `5`.
5. Click `Preview`.

## Expected Result

The app should reject `extensionCount=-1` and `extensionCount=1.5` with validation errors. An extension count is a count and should be a positive integer, consistent with nearby validators for length/count-like params such as `finance.accountNumber(length=1.5)` and `string.*(length=0/-1)`.

## Actual Result

The app generates values for both invalid columns. Example observed output:

```csv
"NegExt","FracExt","NormalExt"
"quaintly","pfft_like.htm","within.html.sh"
"ha_tabletop_uh_huh","meh.dump","colour_smuggle_technologist.mpga.so"
"edge_instantly","outfit.xul","hutch.deb.xlt"
```

`extensionCount=-1` produces filenames without extensions, and `extensionCount=1.5` produces filenames with one extension, with no validation warning.

## Repeatability

Repeatable. Found by the negative-validation subagent and independently reproduced by the main agent in the deployed environment.

## Evidence

![Invalid extensionCount accepted](../screenshots/defect-system-filename-extensioncount-invalid.png)

Video replay: `../videos/DEFECT-001-system-filename-extensioncount-invalid.webm`

Additional final replay screenshot: ![Video final state](../screenshots/defect-system-filename-extensioncount-video-final.png)

## Notes for Investigation

This appears to be a missing validator or insufficient numeric-integer/range validation on the `extensionCount` param for `system.fileName`. Compare the validator behavior with commands that correctly reject invalid count/length values, such as `finance.accountNumber(length=1.5)` and `string.fromCharacters(characters=["A"], length=-1)`.



---


# Source: defects/DEFECT-002-person-sex-parameter-not-applied.md

# DEFECT-002: `person.firstName` and `person.fullName` do not consistently honor the `sex` parameter

## Summary

The deployed generator accepts `sex="female"` and `sex="male"` for `person.firstName` and `person.fullName`, but generated values do not consistently match the requested sex. The output includes male-coded names in `sex="female"` columns and female-coded names in `sex="male"` columns.

## Environment

- Test environment: https://eviltester.github.io/grid-table-editor/site/generator.html
- Date tested: 2026-07-02
- Browser automation: Chrome DevTools MCP and Playwright video replay
- Story/PR under review: issue #286 / PR #294

## Reproduction Steps

1. Open https://eviltester.github.io/grid-table-editor/site/generator.html.
2. Click `Edit as Text`.
3. Paste this schema:

```text
FemaleFirst: person.firstName(sex="female")
FemaleFull: person.fullName(sex="female")
MaleFirst: person.firstName(sex="male")
MaleFull: person.fullName(sex="male")
```

4. Set `Output Format` to `JSON`.
5. Set `Preview Items Count` to `20`.
6. Click `Preview`.

## Expected Result

`person.firstName(sex="female")` and `person.fullName(sex="female")` should generate female names. `person.firstName(sex="male")` and `person.fullName(sex="male")` should generate male names. This follows the published docs and app help examples showing `person.firstName(sex="female")`, `person.fullName(..., sex="female")`, and related sex-constrained params.

## Actual Result

The output contains values that do not match the requested sex. Representative examples from a repeat run:

```json
{
  "FemaleFirst": "Fausto",
  "FemaleFull": "Shelly Yost",
  "MaleFirst": "Samuel",
  "MaleFull": "Maryjane Kub"
}
{
  "FemaleFirst": "Davin",
  "FemaleFull": "Brandy Bogan",
  "MaleFirst": "Sofia",
  "MaleFull": "Graham Baumbach"
}
{
  "FemaleFirst": "Alphonso",
  "FemaleFull": "Ms. Anita Rodriguez",
  "MaleFirst": "Alejandro",
  "MaleFull": "Don Legros"
}
```

The full raw repeat output is saved in `../support/loop3-person-sex-repeat-output.json`.

## Repeatability

Repeatable. First observed by the command-coverage subagent as suspicious output, then reproduced by the main agent with a 20-row sample.

## Evidence

![Person sex parameter output](../screenshots/defect-person-sex-parameter-ignored.png)

Video replay: `../videos/DEFECT-002-person-sex-parameter-not-applied.webm`

Additional final replay screenshot: ![Video final state](../screenshots/defect-person-sex-parameter-video-final.png)

## Notes for Investigation

This may indicate that named `sex` params are parsed and accepted but not mapped correctly into the Faker options object, or that the value is not passed through to `faker.person.firstName` / `faker.person.fullName`. Compare with the PR's `argTransform: optionsFromHelpArgs` handling and with tests that assert parameterized usage examples produce semantically constrained output, not only non-error output.

