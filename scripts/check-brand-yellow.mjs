import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const brandYellowHex = "#fed400";
const brandYellowRgb = "rgb(254, 212, 0)";

const sourceFiles = [
  "index.html",
  "public/site.webmanifest",
  "scripts/enhance-static-seo.mjs",
  "src/components/Seo.tsx",
  "src/index.clean.css",
  "src/lib/seo.ts",
  "src/pages/HomePage.tsx",
];

const disallowedTokens = [
  "#fdd31b",
  "#ffd500",
  "rgb(253, 211, 27)",
  "rgba(253, 211, 27,",
  "rgb(255, 213, 0)",
  "rgba(255, 213, 0,",
  "253,211,27",
  "local-match",
  "bg-matched-poster",
];

const requiredHomeMedia = [
  "hero-ru-bg-brand-yellow.mp4",
  "hero-ru-bg-brand-yellow-poster.png",
  "hero-hy-bg-brand-yellow.mp4",
  "hero-hy-bg-brand-yellow-poster.png",
  "20260525-brand-yellow",
];

const expectedAssetHashes = {
  "public/media/hero-ru-bg-brand-yellow.mp4": "db9e27657f7fab7ce58a7c557fad3ebb4571c99b1c4fba3f24ade3ed55a02992",
  "public/media/hero-ru-bg-brand-yellow-poster.png": "19401bb9e97ccd154d8d3776acd01e5475aa4aa4b4f20d4a94b6ecd05dbc1fca",
  "public/media/hero-hy-bg-brand-yellow.mp4": "ceb13fe75e9ad879b0d0433e771c3a04d00fddca111bb0663203636e72af7ea1",
  "public/media/hero-hy-bg-brand-yellow-poster.png": "daa5ee26dcc7f9c07668e4c8afef4b2be396ca036ae8179348e26849c72664c2",
};

const errors = [];

function readText(path) {
  return readFileSync(join(root, path), "utf8");
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(join(root, path))).digest("hex");
}

for (const file of sourceFiles) {
  const text = readText(file);
  const lowerText = text.toLowerCase();

  for (const token of disallowedTokens) {
    if (lowerText.includes(token.toLowerCase())) {
      errors.push(`${file} contains disallowed hero color/media token: ${token}`);
    }
  }
}

const css = readText("src/index.clean.css");
for (const token of ["--site-header-yellow", "--electro-yellow", "--home-hero-yellow"]) {
  if (!css.includes(`${token}: ${brandYellowRgb}`)) {
    errors.push(`src/index.clean.css must define ${token} as ${brandYellowRgb}`);
  }
}

const indexHtml = readText("index.html");
if (!indexHtml.includes(`name="theme-color" content="${brandYellowHex}"`)) {
  errors.push(`index.html theme-color must be ${brandYellowHex}`);
}

const manifest = readText("public/site.webmanifest");
if (!manifest.includes(`"theme_color": "${brandYellowHex}"`) || !manifest.includes(`"background_color": "${brandYellowHex}"`)) {
  errors.push(`public/site.webmanifest colors must be ${brandYellowHex}`);
}

const homePage = readText("src/pages/HomePage.tsx");
for (const media of requiredHomeMedia) {
  if (!homePage.includes(media)) {
    errors.push(`src/pages/HomePage.tsx must reference ${media}`);
  }
}

for (const [asset, expectedHash] of Object.entries(expectedAssetHashes)) {
  const actualHash = sha256(asset);
  if (actualHash !== expectedHash) {
    errors.push(`${asset} hash changed: expected ${expectedHash}, got ${actualHash}`);
  }
}

if (errors.length > 0) {
  console.error("Brand yellow guard failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Brand yellow guard passed (${brandYellowHex}).`);
