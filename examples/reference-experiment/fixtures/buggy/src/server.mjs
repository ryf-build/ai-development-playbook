import http from "node:http";

const notes = [];

export function createServer() {
  return http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ ok: true }));
      return;
    }
    if (req.method === "POST" && req.url === "/notes") {
      let body = "";
      req.on("data", (chunk) => { body += chunk; });
      req.on("end", () => {
        let parsed = {};
        try { parsed = JSON.parse(body || "{}"); } catch {}
        // Intentional bug: whitespace-only titles are accepted.
        if (!parsed.title) {
          res.writeHead(400, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "title_required" }));
          return;
        }
        const note = { id: notes.length + 1, title: parsed.title };
        notes.push(note);
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(note));
      });
      return;
    }
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "not_found" }));
  });
}
