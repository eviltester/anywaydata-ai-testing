async (page) => {
  await page.goto("https://eviltester.github.io/grid-table-editor/site/generator.html");
  await page.waitForLoadState("domcontentloaded");
  if (await page.getByRole("button", { name: "Edit as Text" }).isVisible().catch(() => false)) {
    await page.getByRole("button", { name: "Edit as Text" }).click();
  }
  await page.getByRole("textbox", { name: "Schema text" }).fill(
    "method\ninternet.httpMethod(excludes=\"GET,HEAD,POST,PUT,DELETE,PATCH,OPTIONS,TRACE,CONNECT\")"
  );
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await page.waitForTimeout(800);
}
