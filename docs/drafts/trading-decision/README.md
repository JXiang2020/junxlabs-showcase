# Trading Decision Showcase — working drafts

Status: Draft material only. No approval to publish or change the live website.

## Editorial direction

The owner accepts the overall direction of the four-page v3 deck, but not its promotional tone or emphasis. v4 retains the substance and uses factual project language similar to Pillar 1.

Pillar 1 showcases development of a reusable AI production tool; course delivery demonstrates its application. Pillar 2 showcases investment research and decisions, including investment risk management. AI is the supporting tool, not the investment objective.

Preserve event-driven investing, the owner's Ph.D. research and trading experience, information diffusion, expectation gaps, regime analysis, trade alternatives, portfolio risk and Kelly. Describe the AI architecture through its contribution to investment decisions rather than promoting AI for its own sake.

## Four-page structure

1. Event-Driven Investment Decision Support — research focus, investment analysis, portfolio decisions, intended use and AI's supporting role.
2. Investment Analysis and Portfolio Risk — expectations, event outcome, market response, trade assessment, instruments, sizing and position management.
3. AI System Architecture — account and market context, eight logical analysis roles, five Wiki/RAG knowledge categories and human decision authority.
4. Implementation Status and Next Steps — demonstrated single-account review pilot, knowledge retrieval, specialist reasoning and evaluation.

## Expression and weighting

- Use descriptive headings and concrete statements, not slogans, rhetorical questions or anthropomorphic claims.
- Remove headings such as "A second mind before every trade", "An event is not a trade", "Eight roles. One investment decision", and "Now build the investing memory".
- Give investment opportunity and decision methods the lead. Risk constrains investment activity; neither AI risk nor behavioral admonitions should dominate the story.
- Treat the first pullback as an execution heuristic, not a universal mandatory stage of every event strategy.
- Keep eight roles and five libraries as design facts, not proof of deployed capability or investment performance.
- Preserve Arial, restrained blue/white styling, clear hierarchy, editable content and the Jun Xiang / LinkedIn byline.
- Use the owner-provided research context without inventing dissertation findings, returns, validated alpha or case outcomes.

## Implementation boundary

The architecture baseline remains v0.7. The recorded T005-C pilot demonstrates a read-only single-account connector handoff into a deterministic review pipeline and Decision Card. Full model-backed reasoning, Wiki/RAG retrieval and complete portfolio analytics are not claimed as implemented. Kelly requires defensible probability/payoff assumptions. No autonomous trading or validated investment performance is claimed.

## Files and backup status

The complete editable PPTX files are backed up inside [Trading_Showcase_v3_v4_backup.tar.xz](Trading_Showcase_v3_v4_backup.tar.xz). This is a full binary archive, not merely text or a reconstruction recipe. It preserves the original v3 file byte-for-byte and includes the current v4 PPTX, both content exports, the editing script and a checksum manifest. PNG previews are not included.

- v3: original working draft; direction broadly accepted, expression requires revision.
- v4: proposed editorial revision; not yet approved by the owner.
- [v3 content](Trading_Showcase_v3_Content.md) and [v4 content](Trading_Showcase_v4_Content.md) provide readable source-control copies.
- [MANIFEST.json](MANIFEST.json) records exact sizes and SHA-256 checksums.

Extract the archive with an archive utility that supports tar.xz, or:

```sh
tar -xf Trading_Showcase_v3_v4_backup.tar.xz
```

The archive payload was checked against the original files before upload. The uploaded Git blob SHA matches the locally computed Git blob SHA: `8a4a119858906c126e8b296a933474bca621c1cb`.

Archive SHA-256: `3f4d3c8572394e77b875d81cbf2f8692c073efd8f67c8a82e4faa7c868166cc7`.

## Sources

- `JXiang2020/junxlabs-showcase/index.html` — current Pillar 1 expression and layout reference.
- `JXiang2020/ai-trading-decision-system/README.md` — implementation boundary.
- `docs/architecture/AI_Trading_Decision_System_Architecture_v0.7_Knowledge_System_2026-09-30.md` in the trading repository — current design.
- `reports/T005C_Execution_Report.md` in the trading repository — recorded pilot evidence, not a fresh test run.
- Owner-provided investment-system narrative and explicit revision feedback.

The drafts are stored on `backup/trading-showcase-v4`. No website code, deployment configuration, approved assets or trading backend behavior is changed. No merge or publication is authorized by this backup.
