# Frozen Candidate combination

- Source repository: `tutar/loop-engineering`
- Repository release: `v0.2.0`
- Candidate source commit: `0c2e87a66e79e32213e2aa3d0207852340dbabe3`
- Definition: `github-pr-review/v0.1.0`
- Compatibility Profile: `github-pr-review/codex/v0.1.0`
- Agent Action: `openai/codex-action@86365089eb2b84e0a8fb0717b304f8bdcb13b20e` (source tag `v1`)
- Runner Profile: GitHub-hosted `ubuntu-24.04`
- Permission profile: `:read-only`
- Safety strategy: `read-only`
- Event Prompt: `Review this change against the repository rules and its requested behavior.`
- Consumer baseline commit: `5234bc345ac76077ea3b21141f21a3d29e445ed4`
- Workflow Instance tree digest (SHA-256 over sorted per-file SHA-256 records): `85258029f84ddfa6fab6142fd8ef9b0170abfcc275327ee7543760a4eb59059e`

Each Case Result freezes its PR number, base SHA, head SHA, event input, workflow run, and Check URL. Results from another combination must not be appended to this evidence set.

Forks, other runners, network-dependent review steps, Action revisions, changed mappings, and changed Profiles remain Not Yet Verified and inherit no support claim. Optional tracing is diagnostic only; missing or failed tracing does not affect a Case or Gate decision.
