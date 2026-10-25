/**
 * Minimal local preview server for the static export in `out/`.
 *
 * It is not a production server: it binds to loopback only, gzips text files
 * and serves the export the way a CDN does, including directory indexes for
 * the trailing-slash URLs this app emits.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { createGzip } from "node:zlib";

const root = path.resolve("out");
const port = Number(process.env.PORT) || 3200;
const host = process.env.HOST || "127.0.0.1";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  let target = path.join(root, decoded);
  if (!target.startsWith(root)) return null;

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  } else if (!fs.existsSync(target) && fs.existsSync(`${target}.html`)) {
    target = `${target}.html`;
  }
  return fs.existsSync(target) ? target : null;
}

const server = http.createServer((request, response) => {
  const file = resolveFile(request.url ?? "/");
  if (!file) {
    const notFound = path.join(root, "404.html");
    response.writeHead(404, { "content-type": TYPES[".html"] });
    response.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : "Not found");
    return;
  }

  const type = TYPES[path.extname(file)] ?? "application/octet-stream";
  const compressible = /^(text\/|application\/(json|xml|javascript))/.test(type);
  const acceptsGzip = /\bgzip\b/.test(request.headers["accept-encoding"] ?? "");

  const headers = {
    "content-type": type,
    "cache-control": file.includes(`${path.sep}_next${path.sep}static${path.sep}`)
      ? "public, max-age=31536000, immutable"
      : "public, max-age=0, must-revalidate",
    "x-content-type-options": "nosniff",
    "referrer-policy": "strict-origin-when-cross-origin",
  };

  if (compressible && acceptsGzip) {
    headers["content-encoding"] = "gzip";
    headers.vary = "accept-encoding";
    response.writeHead(200, headers);
    fs.createReadStream(file).pipe(createGzip()).pipe(response);
    return;
  }

  response.writeHead(200, headers);
  fs.createReadStream(file).pipe(response);
});

server.listen(port, host, () => {
  console.log(`Hadithly preview on http://${host}:${port}`);
});
