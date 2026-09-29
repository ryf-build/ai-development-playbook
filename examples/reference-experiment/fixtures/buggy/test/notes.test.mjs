import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "../src/server.mjs";

async function withServer(run) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try { await run(`http://127.0.0.1:${port}`); }
  finally { await new Promise((resolve) => server.close(resolve)); }
}

async function post(baseUrl, body) {
  return fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("health remains available", async () => {
  await withServer(async (baseUrl) => {
    const r = await fetch(`${baseUrl}/health`);
    assert.equal(r.status, 200);
  });
});

test("POST /notes accepts a valid title", async () => {
  await withServer(async (baseUrl) => {
    const r = await post(baseUrl, { title: "Ship the Skill" });
    assert.equal(r.status, 201);
  });
});

test("POST /notes rejects a missing title", async () => {
  await withServer(async (baseUrl) => {
    const r = await post(baseUrl, {});
    assert.equal(r.status, 400);
  });
});
