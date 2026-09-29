import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const target = path.resolve(process.argv[2] ?? "examples/final-lab");
const serverFile = path.join(target, "src", "server.mjs");

async function loadServerFactory() {
  const mod = await import(`${pathToFileURL(serverFile).href}?oracle=${Date.now()}`);
  assert.equal(typeof mod.createServer, "function", "src/server.mjs must export createServer()");
  return mod.createServer;
}

async function withServer(createServer, run) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  try {
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
}

async function jsonPost(baseUrl, body) {
  const response = await fetch(`${baseUrl}/notes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await response.json();
  } catch {
  }
  return { response, json };
}

async function testBehavior(createServer) {
  await withServer(createServer, async (baseUrl) => {
    const health = await fetch(`${baseUrl}/health`);
    assert.equal(health.status, 200, "existing GET /health behavior must remain intact");

    const missing = await jsonPost(baseUrl, {});
    assert.equal(missing.response.status, 400, "missing title must return 400");

    const empty = await jsonPost(baseUrl, { title: "" });
    assert.equal(empty.response.status, 400, "empty title must return 400");

    const whitespace = await jsonPost(baseUrl, { title: "   \t  " });
    assert.equal(whitespace.response.status, 400, "whitespace-only title must return 400");

    const valid = await jsonPost(baseUrl, { title: "Ship the Skill" });
    assert.equal(valid.response.status, 201, "valid note must return 201");
    assert.ok(valid.json && typeof valid.json === "object", "success response must be JSON");
    assert.equal(valid.json.title, "Ship the Skill", "returned saved note must preserve title");
  });
}

async function testStudentAddedCoverage() {
  const testDir = path.join(target, "test");
  const names = await fs.readdir(testDir);
  const testFiles = names.filter((name) => /\.test\.mjs$/.test(name));
  const bodies = await Promise.all(
    testFiles.map((name) => fs.readFile(path.join(testDir, name), "utf8")),
  );
  assert.ok(
    bodies.some((body) => body.includes("/notes")),
    "student tests must include coverage for POST /notes",
  );
}

const createServer = await loadServerFactory();
await testBehavior(createServer);
await testStudentAddedCoverage();
console.log("ORACLE_RESULT=PASS");
