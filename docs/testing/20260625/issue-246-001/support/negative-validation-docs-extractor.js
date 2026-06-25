async (page) => {
  const urls = [
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/internet",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/image",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/regex-test-data",
    "https://eviltester.github.io/grid-table-editor/site/docs/test-data/domain/domain-test-data"
  ];

  const results = [];
  for (const url of urls) {
    await page.goto(url);
    await page.waitForLoadState("domcontentloaded");
    await page.waitForTimeout(500);
    results.push(await page.evaluate(() => {
      const interesting = /(httpMethod|image\.url|urlLorem|invalid|regex|domain|unknown|params|parameter)/i;
      return {
        url: location.href,
        title: document.title,
        h1: document.querySelector("h1")?.innerText || "",
        h2: [...document.querySelectorAll("h2")].map((h) => h.innerText).slice(0, 16),
        codes: [...document.querySelectorAll("code")]
          .map((c) => c.innerText)
          .filter((text) => interesting.test(text))
          .slice(0, 50),
        textHits: (document.body.innerText || "")
          .split(/\n+/)
          .map((line) => line.trim())
          .filter((line) => interesting.test(line))
          .slice(0, 50)
      };
    }));
  }
  return results;
}
