---
name: code-review
description: Review a pull request against repository standards and requested behavior.
---

# Code Review

Read `AGENTS.md`, `pr-review-context.md`, and the diff between the trusted base and head SHAs supplied in the goal. Run focused tests when useful.

Review two independent axes:

- Standards: compliance with `AGENTS.md`, correctness, maintainability, and test quality.
- Spec: whether the PR implements the requested behavior stated in `pr-review-context.md`.

Return only the JSON object required by the supplied output schema. Use `pass` only when that axis has no actionable findings. Finding strings must be specific and concise. Never write to GitHub or modify the checkout.
