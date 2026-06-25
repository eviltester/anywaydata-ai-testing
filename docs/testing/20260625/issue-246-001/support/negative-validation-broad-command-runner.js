async (page) => {
  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html");
  await page.waitForLoadState("domcontentloaded");
  if (await page.getByRole("button", { name: "Edit as Text" }).isVisible().catch(() => false)) {
    await page.getByRole("button", { name: "Edit as Text" }).click();
  }

  const cases = [
    {
      id: "valid-auto-sequence-doc-example",
      schema: "v\nautoIncrement.sequence(start=10, step=5)",
      expected: "Docs example should generate an incrementing sequence."
    },
    {
      id: "auto-sequence-negative-zeropadding",
      schema: "v\nautoIncrement.sequence(zeropadding=-1)",
      expected: "Negative zeropadding should be rejected or normalized clearly."
    },
    {
      id: "auto-timestamp-invalid-type",
      schema: "v\nautoIncrement.timestamp(type=\"centuries\")",
      expected: "Invalid timestamp type enum should be rejected."
    },
    {
      id: "string-alpha-zero-length",
      schema: "v\nstring.alpha(length=0)",
      expected: "Zero length should be either accepted as empty string or rejected explicitly."
    },
    {
      id: "string-from-empty-characters",
      schema: "v\nstring.fromCharacters(characters=[], length=4)",
      expected: "Empty source character list should be rejected before generation."
    },
    {
      id: "string-uuid-invalid-version",
      schema: "v\nstring.uuid(version=99)",
      expected: "Invalid UUID version should be rejected."
    },
    {
      id: "number-int-inverted-range",
      schema: "v\nnumber.int(max=1, min=10)",
      expected: "Inverted numeric range should be rejected clearly."
    },
    {
      id: "number-float-zero-multiple",
      schema: "v\nnumber.float(multipleOf=0)",
      expected: "Zero multipleOf should be rejected or handled safely."
    },
    {
      id: "date-between-inverted-range",
      schema: "v\ndate.between(from=1640995200000, to=1609459200000)",
      expected: "Inverted date range should be rejected clearly."
    },
    {
      id: "finance-iban-invalid-country",
      schema: "v\nfinance.iban(countryCode=\"ZZ\")",
      expected: "Invalid country code should be rejected or produce clear generation feedback."
    },
    {
      id: "finance-amount-inverted-range",
      schema: "v\nfinance.amount(max=1, min=10)",
      expected: "Inverted amount range should be rejected clearly."
    }
  ];

  const output = page.getByRole("textbox", { name: "Output Preview" });
  const results = [];
  for (const testCase of cases) {
    await page.getByRole("textbox", { name: "Schema text" }).fill(testCase.schema);
    await page.getByRole("button", { name: "Preview", exact: true }).click();
    await page.waitForTimeout(500);
    const preview = await output.inputValue().catch(() => "");
    const values = preview
      .split(/\r?\n/)
      .slice(1)
      .map((line) => line.replace(/^"|"$/g, ""))
      .filter((line) => line.length > 0);
    const messages = await page.evaluate(() => (document.body.innerText || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => /(invalid|failed|unknown|must|required|range|minimum|maximum|empty|error|argument)/i.test(line))
      .slice(0, 40));
    results.push({
      ...testCase,
      preview,
      values,
      uniqueValues: [...new Set(values)].slice(0, 10),
      containsErrorToken: values.some((value) => value.includes("**ERROR**")),
      messages
    });
  }
  return results;
}
