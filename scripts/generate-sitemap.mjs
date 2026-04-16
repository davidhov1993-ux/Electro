import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const cwd = process.cwd();
const envPaths = [".env.local", ".env"].map((file) => resolve(cwd, file));
const defaultSiteUrl = "https://example.com";

function readSiteUrl() {
  for (const filePath of envPaths) {
    try {
      const content = readFileSync(filePath, "utf8");
      const match = content.match(/^VITE_SITE_URL=(.+)$/m);

      if (match?.[1]) {
        return match[1].trim().replace(/^['"]|['"]$/g, "").replace(/\/$/, "");
      }
    } catch {
      continue;
    }
  }

  return process.env.VITE_SITE_URL?.trim().replace(/\/$/, "") || defaultSiteUrl;
}

const siteUrl = readSiteUrl();
const locales = ["ru", "hy"];
const staticPages = ["uslugi", "o-kompanii", "pochemu-vybirayut-nas", "sertifikaty", "kontakty", "zayavka"];
const serviceSlugs = [
  "elektromontazh",
  "220v",
  "380v",
  "elektroshchity-i-avtomatika",
  "osveshchenie",
  "slabotochnye-sistemy",
  "videonablyudenie",
  "elektrozamki-i-kontrol-dostupa",
  "umnyi-dom-i-umnaya-tekhnika",
  "teplyi-pol",
  "avariinyi-elektrik",
  "slozhnye-proekty-pod-klyuch",
];

const urls = locales.flatMap((locale) => {
  const localeRoot = `${siteUrl}/${locale}`;
  const pageUrls = staticPages.map((slug) => `${localeRoot}/${slug}`);
  const serviceUrls = serviceSlugs.map((slug) => `${localeRoot}/uslugi/${slug}`);
  return [localeRoot, ...pageUrls, ...serviceUrls];
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemapPath = resolve(cwd, "public", "sitemap.xml");
const robotsPath = resolve(cwd, "public", "robots.txt");

mkdirSync(dirname(sitemapPath), { recursive: true });
writeFileSync(sitemapPath, sitemapXml, "utf8");
writeFileSync(robotsPath, robotsTxt, "utf8");
