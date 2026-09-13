# Repository rules

- Keep exported functions small and deterministic.
- Every behavior change must include a public-behavior test.
- Reject non-string public inputs with a `TypeError`; do not silently coerce them.
- Do not add runtime dependencies for functionality available in Node.js.
