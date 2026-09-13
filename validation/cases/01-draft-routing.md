# Case: Draft PR stays quiet

- Status: PASS
- Frozen combination: [`../FROZEN-COMBINATION.md`](../FROZEN-COMBINATION.md)
- Event/input: `pull_request.opened`, PR was Draft
- PR: [#1](https://github.com/nian1123/loop-engineering-consumer-validation/pull/1)
- Base SHA: [`5234bc345ac76077ea3b21141f21a3d29e445ed4`](https://github.com/nian1123/loop-engineering-consumer-validation/commit/5234bc345ac76077ea3b21141f21a3d29e445ed4)
- Head SHA: [`2f0c6bfda2b74c523a8935f77be5fa5818409ac9`](https://github.com/nian1123/loop-engineering-consumer-validation/commit/2f0c6bfda2b74c523a8935f77be5fa5818409ac9)
- Workflow run: [34731120217](https://github.com/nian1123/loop-engineering-consumer-validation/actions/runs/34731120217)
- Route job: [103653962184](https://github.com/nian1123/loop-engineering-consumer-validation/actions/runs/34731120217/job/103653962184)
- Review job: [skipped](https://github.com/nian1123/loop-engineering-consumer-validation/actions/runs/34731120217/job/103653987671)
- Publish job: [skipped](https://github.com/nian1123/loop-engineering-consumer-validation/actions/runs/34731120217/job/103653987827)

## Expected

The trusted router handles the Draft `opened` event, but no review Goal or publisher runs and no `Loop Engineering / PR Review` Check is created.

## Observed

The workflow completed successfully with only `route` executed. Both `review` and `publish` were skipped. The head SHA had only the three GitHub Actions job Checks (`route`, skipped `review`, skipped `publish`) and no Candidate review Check.

## Assertions

- [x] Exact frozen Workflow Instance and Profile were used.
- [x] Event was bound to the recorded head SHA.
- [x] Review and publish jobs were skipped.
- [x] No Candidate review Check was created.
- [x] Evidence links are independently accessible.

## Decision

PASS
