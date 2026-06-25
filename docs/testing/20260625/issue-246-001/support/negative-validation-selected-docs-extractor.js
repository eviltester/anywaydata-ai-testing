async (page) => {
  const urls = [
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/autoIncrement",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/string",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/number",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/date",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/finance"
  ];
  const results = [];
  for (const url of urls) {
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(400);
    results.push(await page.evaluate(() => ({
      url: location.href,
      h1: document.querySelector("h1")?.innerText || "",
      examples: [...document.querySelectorAll("code")]
        .map((code) => code.innerText)
        .filter((text) => /(\w+\.\w+\(|autoIncrement\.|string\.|number\.|date\.|finance\.)/.test(text))
        .slice(0, 80)
    })));
  }
  return results;
}
