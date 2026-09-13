import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { auditEvidence, workflowInstanceDigest } from "../validation/verify-evidence.mjs";

test("the checked-in Workflow Instance matches the frozen digest", async () => {
  const audit = await auditEvidence(new URL("../", import.meta.url));
  assert.equal(audit.workflowDigest, "85258029f84ddfa6fab6142fd8ef9b0170abfcc275327ee7543760a4eb59059e");
  assert.deepEqual(audit.caseDecisions, [{ name: "01-draft-routing.md", decision: "PASS" }]);
});

test("a changed Workflow Instance cannot reuse the frozen evidence", async () => {
  const root = await mkdtemp(join(tmpdir(), "consumer-evidence-"));
  await mkdir(join(root, ".github"), { recursive: true });
  await writeFile(join(root, ".github", "workflow.yml"), "changed\n");
  assert.notEqual(await workflowInstanceDigest(join(root, ".github")), "85258029f84ddfa6fab6142fd8ef9b0170abfcc275327ee7543760a4eb59059e");
});
