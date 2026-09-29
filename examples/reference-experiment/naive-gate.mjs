import { spawnSync } from "node:child_process";
import path from "node:path";

const target = path.resolve(process.argv[2]);
const result = spawnSync(process.execPath, ["--test"], {
  cwd: target,
  encoding: "utf8",
});
process.stdout.write(result.stdout || "");
process.stderr.write(result.stderr || "");
console.log(`NAIVE_STATUS=${result.status === 0 ? "PASS" : "BLOCKED"}`);
process.exitCode = result.status === 0 ? 0 : 1;
