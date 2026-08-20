import { copyFileSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "dist/client";
const assets = join(dir, "assets");
const css = readdirSync(assets).find((name) => name.endsWith(".css"));
const src = ["index.html", ".html"].find((name) => existsSync(join(dir, name)));

if (!src) {
  throw new Error("pages-postbuild: missing prerendered HTML shell in dist/client");
}

const nul = String.fromCharCode(0);
const escape = "\\u0000";
let html = readFileSync(join(dir, src), "utf8");
if (css) {
  html = html.replace(
    /\/pomodoro\/assets\/styles-[^"']+\.css/g,
    `/pomodoro/assets/${css}`,
  );
}
html = html.split(nul).join(escape);

if (html.includes(nul)) {
  throw new Error("pages-postbuild: NUL byte still present in HTML");
}

writeFileSync(join(dir, "index.html"), html);
writeFileSync(join(dir, "404.html"), html);

if (existsSync("public/lofi-live.json")) {
  copyFileSync("public/lofi-live.json", join(dir, "lofi-live.json"));
}

if (readFileSync(join(dir, "index.html")).includes(0)) {
  throw new Error("pages-postbuild: wrote a NUL byte to index.html");
}
