import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const oracle = path.resolve(here, "../final-lab-oracle/oracle.mjs");
const fixtures = ["buggy", "correct"];

for (const name of fixtures) {
  const target = path.resolve(here, "fixtures", name);
  console.log(`\n=== ${name.toUpperCase()} ===`);
  const naive = spawnSync(process.execPath, [path.resolve(here, "naive-gate.mjs"), target], { encoding: "utf8" });
  process.stdout.write(naive.stdout || "");
  process.stderr.write(naive.stderr || "");

  const checked = spawnSync(process.execPath, [oracle, target], { encoding: "utf8" });
  if (checked.status === 0) {
    process.stdout.write(checked.stdout || "");
  } else {
    const decisive = (checked.stderr || checked.stdout || "").split("\n").find((line) => line.includes("AssertionError") || line.includes("whitespace-only"));
    console.log(`ORACLE_RESULT=FAIL${decisive ? ` (${decisive.trim()})` : ""}`);
  }
}
