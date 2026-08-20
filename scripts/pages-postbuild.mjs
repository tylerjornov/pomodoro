import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "dist/client";
const assets = join(dir, "assets");
const css = readdirSync(assets).find((name) => name.endsWith(".css"));
const src = ["index.html", ".html"].find((name) => existsSync(join(dir, name)));

if (!src) {
  throw new Error("pages-postbuild: missing prerendered HTML shell in dist/client");
}

let html = readFileSync(join(dir, src), "utf8");
if (css) {
  html = html.replace(
    /\/pomodoro\/assets\/styles-[^"']+\.css/g,
    `/pomodoro/assets/${css}`,
  );
}

writeFileSync(join(dir, "index.html"), html);
writeFileSync(join(dir, "404.html"), html);
