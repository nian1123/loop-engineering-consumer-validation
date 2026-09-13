import assert from "node:assert/strict";
import test from "node:test";

import { greet, normalizeName } from "../src/name.mjs";

test("normalizeName trims surrounding whitespace", () => {
  assert.equal(normalizeName("  Ada Lovelace  "), "Ada Lovelace");
});

test("normalizeName rejects non-string values", () => {
  assert.throws(() => normalizeName(42), TypeError);
});

test("greet returns a normalized personal greeting", () => {
  assert.equal(greet("  Ada Lovelace  "), "Hello, Ada Lovelace!");
});

test("greet rejects non-string values through the public boundary", () => {
  assert.throws(() => greet(null), TypeError);
});
