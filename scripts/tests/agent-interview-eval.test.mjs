import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const validator = path.join(root, "scripts", "validate-agent-interview-eval.mjs");
const fixtures = path.join(root, "docs", "06.03.ai", "fixtures");

test("valid interview evidence fixture passes", () => {
  const result = spawnSync(process.execPath, [validator, "--self-test"], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /self-test passed/);
});

test("invalid interview evidence fixture fails closed", () => {
  const result = spawnSync(process.execPath, [
    validator,
    path.join(fixtures, "agent-interview-eval-v1-invalid.json")
  ], { encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /must be 64 lowercase hex|integer in \[0, 4\]|HTTPS URL/);
});
