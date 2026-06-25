import fs from "node:fs/promises";

const base = "https://eviltester.github.io/grid-table-editor";

const urls = [
  `${base}/site/`,
  `${base}/site/app.html`,
  `${base}/site/generator.html`,
  `${base}/app.html`,
  `${base}/generator.html`,
  `${base}/site/docs/intro`,
  `${base}/site/docs/interfaces-and-deployment/web-ui`,
  `${base}/site/docs/test-data/test-data-generation/`,
  `${base}/site/docs/test-data/domain/domain-test-data`,
  `${base}/site/docs/test-data/domain/airline/`,
  `${base}/site/docs/test-data/domain/animal/`,
  `${base}/site/docs/test-data/domain/autoIncrement/`,
  `${base}/site/docs/test-data/domain/book/`,
  `${base}/site/docs/test-data/domain/color/`,
  `${base}/site/docs/test-data/domain/commerce/`,
  `${base}/site/docs/test-data/domain/company/`,
  `${base}/site/docs/test-data/domain/database/`,
  `${base}/site/docs/test-data/domain/datatype/`,
  `${base}/site/docs/test-data/domain/date/`,
  `${base}/site/docs/test-data/domain/finance/`,
  `${base}/site/docs/test-data/domain/food/`,
  `${base}/site/docs/test-data/domain/git/`,
  `${base}/site/docs/test-data/domain/hacker/`,
  `${base}/site/docs/test-data/domain/image/`,
  `${base}/site/docs/test-data/domain/internet/`,
  `${base}/site/docs/test-data/domain/literal/`,
  `${base}/site/docs/test-data/domain/location/`,
  `${base}/site/docs/test-data/domain/lorem/`,
  `${base}/site/docs/test-data/domain/music/`,
  `${base}/site/docs/test-data/domain/number/`,
  `${base}/site/docs/test-data/domain/person/`,
  `${base}/site/docs/test-data/domain/phone/`,
  `${base}/site/docs/test-data/domain/science/`,
  `${base}/site/docs/test-data/domain/string/`,
  `${base}/site/docs/test-data/domain/system/`,
  `${base}/site/docs/test-data/domain/vehicle/`,
  `${base}/site/docs/test-data/domain/word/`,
  `${base}/site/docs/test-data/faker-test-data/`,
  `${base}/site/docs/test-data/regex-test-data/`,
  `${base}/site/docs/test-data/generate-to-file/`,
];

const patterns = [
  "image.urlLoremFlickr",
  "urlLoremFlickr",
  "internet.httpMethod",
  "location.cardinalDirection(abbreviated",
  "location.direction(abbreviated",
  "helpers.mustache",
  "faker.location.cardinalDirection({",
  "generate.html",
  "generator.html",
  "anywaydata.com",
  "/grid-table-editor/generator.html",
  "/grid-table-editor/site/generator.html",
];

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let i = 0; i < attempts; i += 1) {
    try {
      const response = await fetch(url);
      const text = await response.text();
      return { ok: response.ok, status: response.status, text };
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 500 * (i + 1)));
    }
  }
  return { ok: false, status: 0, text: "", error: String(lastError) };
}

function decodeEntities(text) {
  return text
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#x2F;", "/")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

function stripTags(html) {
  return decodeEntities(html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function extract(html, url) {
  const title = stripTags((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const headings = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((match) => ({ level: Number(match[1]), text: stripTags(match[2]) }))
    .filter((item) => item.text);
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({ href: decodeEntities(match[1]), text: stripTags(match[2]) }))
    .filter((item) => item.href);
  const codeBlocks = [...html.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/gi)]
    .map((match) => stripTags(match[1]))
    .filter((text) => text && text.length < 500);
  const text = stripTags(html);
  const hits = Object.fromEntries(patterns.map((pattern) => [pattern, text.includes(pattern)]));
  const sameHostLinks = links.filter((link) => link.href.includes("/grid-table-editor/"));
  const escapedContextLinks = sameHostLinks.filter((link) =>
    link.href.includes("/grid-table-editor/") && !link.href.includes("/grid-table-editor/site/")
  );
  return {
    url,
    title,
    headings: headings.slice(0, 80),
    links: links.slice(0, 160),
    codeBlocks: codeBlocks.slice(0, 120),
    hits,
    escapedContextLinks: escapedContextLinks.slice(0, 40),
    codeBlockCount: codeBlocks.length,
  };
}

const pages = [];
for (const url of urls) {
  const result = await fetchWithRetry(url);
  pages.push({
    url,
    ok: result.ok,
    status: result.status,
    error: result.error,
    ...(result.text ? extract(result.text, url) : {}),
  });
}

const summary = {
  generatedAt: new Date().toISOString(),
  base,
  total: pages.length,
  ok: pages.filter((page) => page.ok).length,
  failed: pages.filter((page) => !page.ok).map((page) => ({ url: page.url, status: page.status, error: page.error })),
  patternHits: Object.fromEntries(patterns.map((pattern) => [
    pattern,
    pages.filter((page) => page.hits?.[pattern]).map((page) => page.url),
  ])),
  pages,
};

await fs.writeFile(
  "docs/testing/20260625/issue-246-001/support/docs-consistency-page-audit.json",
  JSON.stringify(summary, null, 2),
);

console.log(JSON.stringify({
  generatedAt: summary.generatedAt,
  total: summary.total,
  ok: summary.ok,
  failed: summary.failed,
  patternHits: summary.patternHits,
}, null, 2));
