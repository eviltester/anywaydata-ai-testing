async function (page) {
  const params = page.getByRole("textbox", { name: "Params" });
  await params.fill("(\"Hello {{name}}\", { name: \"Ada\" })");
  const previewCount = page.getByRole("spinbutton", { name: "Preview Items Count" });
  await previewCount.fill("3");
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await page.waitForTimeout(1000);
  return {
    paramsValue: await params.inputValue(),
    preview: await page.getByRole("textbox", { name: "Output Preview" }).inputValue(),
    statusText: await page.locator("[role='status']").allTextContents(),
  };
}
