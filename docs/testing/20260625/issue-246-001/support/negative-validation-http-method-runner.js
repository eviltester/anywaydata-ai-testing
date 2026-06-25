async (page) => {
  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html");
  await page.waitForLoadState("domcontentloaded");
  if (await page.getByRole("button", { name: "Edit as Text" }).isVisible().catch(() => false)) {
    await page.getByRole("button", { name: "Edit as Text" }).click();
  }

  const cases = [
    {
      id: "docs-example-common-only",
      schema: "method\ninternet.httpMethod(commonOnly=true)",
      expected: "Docs example should generate only common methods."
    },
    {
      id: "docs-example-excludes-case-insensitive",
      schema: "method\ninternet.httpMethod(excludes=\"patch, TRACE\")",
      expected: "Docs example should not generate PATCH or TRACE."
    },
    {
      id: "exclude-all-methods",
      schema: "method\ninternet.httpMethod(excludes=\"GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS,TRACE,CONNECT\")",
      expected: "Excluding the full enum should reject or provide clear feedback rather than returning impossible/undefined values."
    },
    {
      id: "wrong-param-case",
      schema: "method\ninternet.httpMethod(CommonOnly=true)",
      expected: "Parameter names appear camelCase; wrong casing should be rejected clearly."
    },
    {
      id: "quoted-boolean",
      schema: "method\ninternet.httpMethod(commonOnly=\"true\")",
      expected: "Quoted boolean should either be accepted consistently or rejected as wrong type."
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
      .filter(Boolean);
    const messages = await page.evaluate(() => (document.body.innerText || "")
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => /(invalid|failed|unknown|must|required|exclude|method|validation)/i.test(line))
      .slice(0, 40));
    results.push({
      ...testCase,
      preview,
      values,
      uniqueValues: [...new Set(values)].sort(),
      containsPatch: values.includes("PATCH"),
      containsTrace: values.includes("TRACE"),
      messages
    });
  }
  return results;
}
