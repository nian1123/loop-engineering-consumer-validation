import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export async function workflowInstanceDigest(githubDirectory) {
  const directory = resolvePath(githubDirectory);
  const files = await listFiles(directory);
  const records = [];
  for (const file of files) {
    const contents = await readFile(file);
    const digest = createHash("sha256").update(contents).digest("hex");
    const path = join(basename(directory), relative(directory, file)).replaceAll("\\", "/");
    records.push(`${digest}  ${path}\n`);
  }
  return createHash("sha256").update(records.join("")).digest("hex");
}

export async function auditEvidence(projectRoot) {
  const root = resolvePath(projectRoot);
  const frozen = await readFile(join(root, "validation", "FROZEN-COMBINATION.md"), "utf8");
  const declaredDigest = frozen.match(/Workflow Instance tree digest[^`]*`([a-f0-9]{64})`/)?.[1];
  if (!declaredDigest) throw new Error("Frozen combination does not declare a Workflow Instance digest");

  const workflowDigest = await workflowInstanceDigest(join(root, ".github"));
  if (workflowDigest !== declaredDigest) throw new Error("Workflow Instance differs from the frozen combination");

  const casesDirectory = join(root, "validation", "cases");
  const caseNames = (await readdir(casesDirectory)).filter((name) => name.endsWith(".md")).sort();
  const caseDecisions = [];
  for (const name of caseNames) {
    const contents = await readFile(join(casesDirectory, name), "utf8");
    for (const heading of ["## Expected", "## Observed", "## Assertions", "## Decision"]) {
      if (!contents.includes(heading)) throw new Error(`${name} is missing ${heading}`);
    }
    if (!contents.includes("FROZEN-COMBINATION.md")) throw new Error(`${name} does not reference the frozen combination`);
    if (!/https:\/\/github\.com\//.test(contents)) throw new Error(`${name} has no GitHub evidence link`);

    const status = contents.match(/^- Status: (PASS|FAIL|NOT_RUN)$/m)?.[1];
    const decision = contents.match(/## Decision\s+\n(PASS|FAIL|NOT_RUN)/)?.[1];
    if (!status || !decision || status !== decision) throw new Error(`${name} has an invalid or inconsistent decision`);
    caseDecisions.push({ name, decision });
  }
  return { workflowDigest, caseDecisions };
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path));
    else if (entry.isFile()) files.push(path);
  }
  return files.sort();
}

function resolvePath(value) {
  return value instanceof URL ? fileURLToPath(value) : resolve(value);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const result = await auditEvidence(process.cwd());
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
