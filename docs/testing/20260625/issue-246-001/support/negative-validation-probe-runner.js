async (page) => {
  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html");
  await page.waitForLoadState("domcontentloaded");
  if (await page.getByRole("button", { name: "Edit as Text" }).isVisible().catch(() => false)) {
    await page.getByRole("button", { name: "Edit as Text" }).click();
  }
  await page.getByRole("textbox", { name: "Schema text" }).waitFor({ timeout: 15000 });

  const cases = [
    {
      id: "baseline-http-method",
      family: "domain",
      schema: "method\ninternet.httpMethod",
      expected: "Valid baseline; preview should generate documented HTTP methods."
    },
    {
      id: "unknown-domain-command",
      family: "domain",
      schema: "bad\ninternet.notACommand",
      expected: "Invalid command should be rejected with clear feedback and no runtime crash."
    },
    {
      id: "unknown-domain-param",
      family: "domain",
      schema: "method\ninternet.httpMethod(foo=true)",
      expected: "Unknown named parameter should be rejected or ignored with explicit feedback; should not silently produce misleading output."
    },
    {
      id: "bad-boolean-param",
      family: "domain",
      schema: "method\ninternet.httpMethod(commonOnly=maybe)",
      expected: "Boolean param boundary should reject non-boolean value."
    },
    {
      id: "unclosed-quote-param",
      family: "domain",
      schema: "method\ninternet.httpMethod(excludes=\"GET)",
      expected: "Parser should reject unclosed quote with recoverable validation feedback."
    },
    {
      id: "duplicate-param",
      family: "domain",
      schema: "method\ninternet.httpMethod(commonOnly=true, commonOnly=false)",
      expected: "Duplicate parameter should either be rejected or resolved consistently and documented."
    },
    {
      id: "unsafe-param-string",
      family: "domain",
      schema: "method\ninternet.httpMethod(excludes=\"<script>alert(1)</script>\")",
      expected: "Unsafe-looking string should not execute, should not escape into UI, and should have clear validation semantics."
    },
    {
      id: "deprecated-image-command",
      family: "domain",
      schema: "img\nimage.urlLoremFlickr",
      expected: "Removed/deprecated command should be unavailable with clear feedback, while replacement is image.url."
    },
    {
      id: "replacement-image-command",
      family: "domain",
      schema: "img\nimage.url",
      expected: "Replacement command baseline should generate a URL-like value."
    },
    {
      id: "invalid-regex-parser",
      family: "regex",
      schema: "value\n[abc",
      expected: "Invalid regex syntax should be rejected without stale preview confusion."
    },
    {
      id: "empty-regex-rule",
      family: "regex",
      schema: "value\n",
      expected: "Missing rule should produce clear validation feedback."
    },
    {
      id: "faker-style-domain-syntax",
      family: "domain",
      schema: "method\nfaker.internet.httpMethod({ commonOnly: true })",
      expected: "Domain command should not accept faker object/positional syntax per story note."
    }
  ];

  const results = [];
  for (const testCase of cases) {
    await page.getByRole("textbox", { name: "Schema text" }).fill(testCase.schema);
    const before = await page.getByRole("textbox", { name: "Output Preview" }).inputValue().catch(() => "");
    await page.getByRole("button", { name: "Preview", exact: true }).click();
    await page.waitForTimeout(450);
    const after = await page.getByRole("textbox", { name: "Output Preview" }).inputValue().catch(() => "");

    const result = await page.evaluate(() => {
      const selectors = [
        '[role="alert"]',
        '[aria-live]',
        '.error',
        '.errors',
        '.validation',
        '.invalid',
        '[data-role*="error"]',
        '[data-testid*="error"]',
        '.generator-status',
        '.status'
      ];
      const messages = [...document.querySelectorAll(selectors.join(","))]
        .map((el) => (el.innerText || el.textContent || "").trim())
        .filter(Boolean);
      const bodyText = document.body.innerText || "";
      const matchingBodyLines = bodyText
        .split(/\n+/)
        .map((line) => line.trim())
        .filter((line) => /(error|invalid|unknown|schema|parse|failed|unable|must|cannot|deprecated|not found)/i.test(line))
        .slice(0, 30);
      return {
        messages: [...new Set(messages)].slice(0, 20),
        matchingBodyLines
      };
    });

    results.push({
      ...testCase,
      before,
      preview: after,
      outputChanged: before !== after,
      messages: result.messages,
      matchingBodyLines: result.matchingBodyLines
    });
  }
  return results;
}
