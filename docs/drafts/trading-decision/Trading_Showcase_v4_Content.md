# Trading Decision Showcase — v4

Status: Working draft, not approved for publication.
Baseline: 2026-10-01.

## Page 1

Event-Driven Investment
Decision Support

This project combines my Ph.D. research and trading experience in an event-driven investment framework, supported by AI-assisted analysis.

01

Research Focus

Study information diffusion, expectation gaps and changes in market pricing.

02

Investment Analysis

Assess what price already reflects and which evidence could invalidate the thesis.

03

Portfolio Decisions

Compare instruments, timing and size against existing exposure and potential loss.

PROJECT SCOPE

Intended Use

Support research and decisions to enter, add, manage, hedge or exit positions.

In development; limited runtime prototype.

Role of AI

Organize evidence, test alternative explanations and retrieve relevant research and past cases.

### Source and scope notes
PUBLIC SHOWCASE DRAFT v4 — 2026-10-01 baseline.
User direction: investment is the purpose; AI is a tool. Keep compelling subject matter but use factual, professional project language similar to Pillar 1.
The owner’s Ph.D. research connection comes from the owner-provided project narrative; no specific dissertation findings or demonstrated alpha are asserted.
Sources: https://github.com/JXiang2020/ai-trading-decision-system/blob/main/source/system/Personal_AI_Trading_Decision_System_Handoff_v0.3.md
https://github.com/JXiang2020/ai-trading-decision-system/blob/main/README.md

## Page 2

Investment Analysis and Portfolio Risk

Evaluate events relative to expectations, then assess the remaining opportunity and its portfolio implications.

01

Pre-event context

Expectations, positioning
and price.

02

Event outcome

Identify new facts and
changes to the thesis.

03

Market response

Assess repricing,
overreaction or no edge.

04

Trade assessment

Assess remaining edge
and define invalidation.

Instrument and Timing

Compare stock, options, spreads and no action. Assess expiry, implied volatility, liquidity and price confirmation, including the first pullback.

Portfolio Risk and Sizing

Assess shared exposures, leverage and downside scenarios. Apply Kelly only when probability and payoff assumptions are defensible.

Position Management

Separate long-term and tactical positions. Reassess adds and exits as evidence changes; recent P/L alone does not justify more risk.

Decision review preserves the original information, subsequent actions and outcome.

### Source and scope notes
Investment framework, not an implemented strategy or a trading recommendation. Mechanisms remain candidates unless validated. First pullback is an execution heuristic, not a universal required stage. Kelly depends on defensible probability/payoff assumptions; no position size is proposed.
Sources: https://github.com/JXiang2020/ai-trading-decision-system/blob/main/source/system/Personal_AI_Trading_Decision_System_Handoff_v0.3.md
https://github.com/JXiang2020/ai-trading-decision-system/blob/main/docs/architecture/AI_Trading_Decision_System_Architecture_v0.7_Knowledge_System_2026-09-30.md

## Page 3

AI System Architecture

Eight logical analysis roles combine account context, investment evidence and portfolio review.

TARGET DESIGN

CONTEXT & DATA

Broker account

Holdings · cash
Buying power

Read-only pilot demonstrated

Market & event data

Prices, news, catalysts
and expectations · planned

LOGICAL ANALYSIS ROLES

Trading  ·  scope, route and integrate

Macro

Company & Event

Technical

Regime

Market Expectations & Pricing

Red-Team

Strongest counter-thesis

Portfolio

Scenarios · risk · Kelly

DECISION CARD

Thesis and counter-thesis
Trade alternatives
Portfolio implications
Confirmation / invalidation

Human decision

KNOWLEDGE / 5 TYPES

External knowledge  ·  Personal cases  ·  Opportunity patterns  ·  Execution playbook  ·  Risk & failure modes

Wiki structures knowledge and relationships; RAG retrieves original evidence and records.

Target design. Full model-backed reasoning and Wiki/RAG retrieval are not yet implemented.

### Source and scope notes
Target design, not eight deployed agents. Preserve all eight logical roles: Trading, Macro, Company & Event, Technical, Regime, Market Expectations & Pricing, Red-Team, Portfolio. Five library types are canonical categories, not separate services. Account data and active policies remain distinct from retrieved knowledge.
Source: https://github.com/JXiang2020/ai-trading-decision-system/blob/main/docs/architecture/AI_Trading_Decision_System_Architecture_v0.7_Knowledge_System_2026-09-30.md

## Page 4

Implementation Status and Next Steps

An initial account-data review path has been demonstrated. Investment reasoning and knowledge retrieval remain under development.

DEMONSTRATED

Read-only Data Review

A read-only Schwab snapshot reaches the rule-based review pipeline through SnapTrade.

Holdings, cash, buying power and broker-reported total value reach the Decision Card.

NEXT / KNOWLEDGE

Knowledge Retrieval

Organize books, papers, research and personal cases in the five-library Wiki/RAG design.

Link summaries to original evidence, counterexamples and decision records.

NEXT / ANALYSIS & EVALUATION

Analysis and Evaluation

Implement specialist reasoning and portfolio scenario comparisons.

Evaluate usefulness through historical cases, prospective decisions and post-trade review.

Current boundary: single-account pilot with data gaps; no autonomous trading or validated investment performance.

### Source and scope notes
Implementation claims refer to the recorded T005-C pilot, not a new test run in this revision. The connector handoff read one account; it did not independently authenticate from local Python or execute trades. Data gaps remained; review output was insufficient_data and Kelly not_estimable. Detailed account values and identifiers are excluded. Wiki/RAG, model-backed roles, full portfolio analytics and validated investment advantage are not claimed as completed.
Sources: https://github.com/JXiang2020/ai-trading-decision-system/blob/main/reports/T005C_Execution_Report.md
https://github.com/JXiang2020/ai-trading-decision-system/blob/main/README.md
