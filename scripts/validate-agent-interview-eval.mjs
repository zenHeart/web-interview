#!/usr/bin/env node
/**
 * Validate the versioned Agent system interview evidence contract.
 * The validator is deliberately dependency-free and fail-closed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FIXTURES = path.join(ROOT, "..", "docs", "06.03.ai", "fixtures");
const SHA = /^[a-f0-9]{64}$/;
const ID = /^[a-z0-9][a-z0-9._-]*$/;
const TYPES = new Set(["code", "trace", "diagram", "test", "explanation"]);
const DECISIONS = new Set(["pass", "needs_followup", "no"]);
const QUALIFICATIONS = new Set(["qualified", "needs_followup", "not_qualified"]);
const MASTERY = new Set(["pass", "pending", "fail"]);
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const required = (errors, value, label) => {
  if (value === undefined || value === null || value === "") errors.push(label + " is required");
};
const exactKeys = (errors, value, allowed, label) => {
  if (!isObject(value)) return;
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) errors.push(label + " has unknown field " + key);
  }
};
const nonEmptyStrings = (errors, value, label, min = 1, max = Infinity) => {
  if (!Array.isArray(value) || value.length < min || value.length > max || value.some((v) => typeof v !== "string" || !v.trim())) {
    errors.push(label + " must be an array of " + min + ".." + (max === Infinity ? "∞" : max) + " non-empty strings");
  }
};
const https = (value) => {
  try { return new URL(value).protocol === "https:"; } catch { return false; }
};

export function validateInterviewEvidence(report, label = "<report>") {
  const errors = [];
  if (!isObject(report)) return [label + " must be an object"];
  exactKeys(errors, report, ["artifact","spec","target_role","scenario","questions","evidence","scores","decision","qualification","mastery","links"], label);
  if (report.artifact !== "interview-agent-eval") errors.push(label + ".artifact must be interview-agent-eval");
  if (report.spec !== "agent-interview-eval-v1") errors.push(label + ".spec must be agent-interview-eval-v1");
  required(errors, report.target_role, label + ".target_role");

  const scenario = report.scenario;
  if (!isObject(scenario)) errors.push(label + ".scenario must be an object");
  else {
    exactKeys(errors, scenario, ["id","prompt","constraints","expected_state"], label + ".scenario");
    if (typeof scenario.id !== "string" || !ID.test(scenario.id)) errors.push(label + ".scenario.id must be a stable id");
    required(errors, scenario.prompt, label + ".scenario.prompt");
    nonEmptyStrings(errors, scenario.constraints, label + ".scenario.constraints");
    nonEmptyStrings(errors, scenario.expected_state, label + ".scenario.expected_state");
  }

  const questions = report.questions;
  const questionIds = new Set();
  if (!Array.isArray(questions) || questions.length === 0) errors.push(label + ".questions must be non-empty");
  else for (const [i, q] of questions.entries()) {
    const tag = label + ".questions[" + i + "]";
    if (!isObject(q)) { errors.push(tag + " must be an object"); continue; }
    exactKeys(errors, q, ["id","question","followups","expected_topics"], tag);
    if (typeof q.id !== "string" || !ID.test(q.id)) errors.push(tag + ".id must be a stable id");
    if (questionIds.has(q.id)) errors.push(tag + ".id duplicates another question");
    questionIds.add(q.id);
    required(errors, q.question, tag + ".question");
    nonEmptyStrings(errors, q.followups, tag + ".followups", 0, 5);
    nonEmptyStrings(errors, q.expected_topics, tag + ".expected_topics");
  }

  const evidence = report.evidence;
  if (!Array.isArray(evidence) || evidence.length === 0) errors.push(label + ".evidence must be non-empty");
  else for (const [i, item] of evidence.entries()) {
    const tag = label + ".evidence[" + i + "]";
    if (!isObject(item)) { errors.push(tag + " must be an object"); continue; }
    exactKeys(errors, item, ["question_id","type","locator","sha256","failing_case"], tag);
    if (!questionIds.has(item.question_id)) errors.push(tag + ".question_id must reference a question");
    if (!TYPES.has(item.type)) errors.push(tag + ".type is invalid");
    for (const key of ["locator", "failing_case"]) required(errors, item[key], tag + "." + key);
    if (typeof item.sha256 !== "string" || !SHA.test(item.sha256)) errors.push(tag + ".sha256 must be 64 lowercase hex characters");
  }

  const scores = report.scores;
  const scoreKeys = ["architecture", "security", "reliability", "evaluation", "communication"];
  if (!isObject(scores)) errors.push(label + ".scores must be an object");
  else {
    exactKeys(errors, scores, scoreKeys, label + ".scores");
    for (const key of scoreKeys) {
      if (!Number.isInteger(scores[key]) || scores[key] < 0 || scores[key] > 4) errors.push(label + ".scores." + key + " must be an integer in [0, 4]");
    }
  }
  if (!DECISIONS.has(report.decision)) errors.push(label + ".decision is invalid");
  if (!QUALIFICATIONS.has(report.qualification)) errors.push(label + ".qualification is invalid");
  if (!MASTERY.has(report.mastery)) errors.push(label + ".mastery is invalid");

  const links = report.links;
  if (!isObject(links)) errors.push(label + ".links must be an object");
  else {
    exactKeys(errors, links, ["workflow_issue","career_issue","eval_spec"], label + ".links");
    for (const key of ["workflow_issue", "career_issue", "eval_spec"]) {
      if (typeof links[key] !== "string" || !https(links[key])) errors.push(label + ".links." + key + " must be an HTTPS URL");
    }
  }
  if (report.qualification === "qualified" && report.mastery !== "pass") {
    errors.push(label + " cannot qualify a learner while mastery is not pass");
  }
  return errors;
}

function readJson(file) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (error) { return { __parseError: error.message }; }
}

const args = process.argv.slice(2);
if (args.includes("--self-test")) {
  const validFile = path.join(FIXTURES, "agent-interview-eval-v1.json");
  const invalidFile = path.join(FIXTURES, "agent-interview-eval-v1-invalid.json");
  const validErrors = validateInterviewEvidence(readJson(validFile), validFile);
  const invalidErrors = validateInterviewEvidence(readJson(invalidFile), invalidFile);
  if (validErrors.length || !invalidErrors.length) {
    console.error("agent-interview-eval-v1 self-test failed", { validErrors, invalidErrors });
    process.exit(1);
  }
  console.log("agent-interview-eval-v1 self-test passed");
} else {
  const files = args.length ? args.map((file) => path.resolve(process.cwd(), file)) : [path.join(FIXTURES, "agent-interview-eval-v1.json")];
  const errors = [];
  for (const file of files) {
    const report = readJson(file);
    if (report.__parseError) errors.push(file + ": JSON parse failed: " + report.__parseError);
    else errors.push(...validateInterviewEvidence(report, file));
  }
  if (errors.length) {
    errors.forEach((error) => console.error(error));
    process.exit(1);
  }
  console.log("agent-interview-eval-v1 validation passed (" + files.length + " report(s))");
}
