import assert from "node:assert/strict";
import test from "node:test";

import { normalizeName } from "../src/name.mjs";

test("normalizeName trims surrounding whitespace", () => {
  assert.equal(normalizeName("  Ada Lovelace  "), "Ada Lovelace");
});

test("normalizeName rejects non-string values", () => {
  assert.throws(() => normalizeName(42), TypeError);
});
