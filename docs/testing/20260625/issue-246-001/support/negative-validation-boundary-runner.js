async (page) => {
  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html");
  await page.waitForLoadState("domcontentloaded");
  if (await page.getByRole("button", { name: "Edit as Text" }).isVisible().catch(() => false)) {
    await page.getByRole("button", { name: "Edit as Text" }).click();
  }
  await page.getByRole("textbox", { name: "Schema text" }).fill("method\ninternet.httpMethod");

  const results = [];
  const previewCount = page.getByRole("spinbutton", { name: "Preview Items Count" });
  const generateRows = page.getByRole("spinbutton", { name: "Generate Rows" });
  const previewButton = page.getByRole("button", { name: "Preview", exact: true });
  const generateButton = page.getByRole("button", { name: "Generate Data" });
  const output = page.getByRole("textbox", { name: "Output Preview" });

  for (const testCase of [
    { id: "preview-count-zero", control: previewCount, value: "0", button: previewButton, expected: "Should generate only header/zero data rows or reject with clear min validation." },
    { id: "preview-count-negative", control: previewCount, value: "-1", button: previewButton, expected: "Should reject negative preview count without stale output." },
    { id: "preview-count-nonnumeric", control: previewCount, value: "abc", button: previewButton, expected: "Should reject or normalize nonnumeric preview count without stale output." },
    { id: "generate-rows-zero", control: generateRows, value: "0", button: generateButton, expected: "Should reject or intentionally generate zero rows with clear feedback." },
    { id: "generate-rows-negative", control: generateRows, value: "-1", button: generateButton, expected: "Should reject negative row generation count." },
    { id: "generate-rows-nonnumeric", control: generateRows, value: "abc", button: generateButton, expected: "Should reject or normalize nonnumeric row generation count." }
  ]) {
    let fillError = "";
    try {
      await testCase.control.fill(testCase.value);
    } catch (error) {
      fillError = String(error.message || error).split("\n")[0];
    }
    const valueAfterFill = await testCase.control.inputValue().catch(() => "");
    const before = await output.inputValue().catch(() => "");
    await testCase.button.click();
    await page.waitForTimeout(500);
    const after = await output.inputValue().catch(() => "");
    const messages = await page.evaluate(() => {
      const text = document.body.innerText || "";
      return text
        .split(/\n+/)
        .map((line) => line.trim())
        .filter((line) => /(error|invalid|must|minimum|maximum|row|preview|cannot|failed|required|range)/i.test(line))
        .slice(0, 40);
    });
    results.push({
      id: testCase.id,
      valueAttempted: testCase.value,
      valueAfterFill,
      fillError,
      expected: testCase.expected,
      before,
      after,
      outputChanged: before !== after,
      messages
    });
  }
  return results;
}
