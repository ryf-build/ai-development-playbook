import http from "node:http";

export function createServer() {
  return http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }

    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const server = createServer();
  server.listen(3000, "127.0.0.1", () => {
    console.log("listening on http://127.0.0.1:3000");
  });
}
