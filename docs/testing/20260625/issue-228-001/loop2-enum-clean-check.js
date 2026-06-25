async page => {
  await page.goto('https://eviltester.github.io/grid-table-editor/generator.html?loop2=enum-clean');
  await page.getByRole('button', { name: 'Edit as Text' }).click();
  await page.getByRole('textbox', { name: 'Schema text' }).fill('Status\nenum("Open","Closed")');
  await page.getByRole('button', { name: 'Preview', exact: true }).click();
  await page.waitForTimeout(500);
  return {
    output: await page.getByRole('textbox', { name: 'Output Preview' }).inputValue(),
    bodySnippet: (await page.locator('body').innerText()).slice(0, 1500)
  };
}
