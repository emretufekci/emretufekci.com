---
title: "I automated my job search: LinkedIn → Telegram → a tailored CV per role"
description: "How a dead startup turned into the pipeline that got me through ~100 applications and interviews at Meta, Google, Nokia, Arm and others, without retyping a single résumé."
date: 2026-10-31
category: engineering
---

In 2025 I decided to change jobs. I was also working long hours at a defense-industry employer and running a couple of side projects. Applying the "right" way was out of the question: a hand-tailored CV and cover letter for every role, a spreadsheet to track it all, follow-ups.

So I did what engineers do. I automated the boring part.

## The pipeline

The whole thing has four steps:

1. **Save on LinkedIn.** When I see a role I like, I hit *Save*. That's the only manual step.
2. **Export to JSON → Telegram.** The saved jobs, with title, company, URL and full description, get exported as JSON and sent to my own Telegram bot.
3. **Tailor.** A Python service behind the bot takes my *core CV* and the job description, and uses an LLM to rewrite the summary, reorder the experience bullets and pick the right skills. It also drafts a cover letter. Nothing gets invented: the model can only select and rephrase facts from the core CV.
4. **Store and track.** The output is written to Google Drive as both `.docx` and LaTeX/PDF, and a row goes into a Google Sheet: company, role, link, date, status. When a recruiter replies, the status changes.

```text
LinkedIn (Save) ─▶ JSON ─▶ Telegram bot ─▶ Python + LLM ─▶ Drive (.docx, .tex/.pdf)
                                                     └──▶ Google Sheets tracker
```

## Why Telegram?

Telegram is the cheapest UI I could build. It runs on my phone and my laptop, it has push notifications, and a bot needs zero front-end code. I could send jobs from the train and get a ready-to-send PDF back before my stop.

## It started as a startup

The core of this was **ResumeCrafter**, a startup a friend and I built in 2024. It did AI job discovery and per-posting résumé tailoring. It worked well. It failed as a business: we never found enough paying users. When I needed it for myself, the hard parts were already done. I cut it down to a single-user tool, and that turned out to be the best use it ever had.

> A product that solves *your own* problem is not necessarily a business. But it's never a waste.

## What I learned

- **Constrain the LLM.** "Rewrite my CV for this job" invites hallucinated skills. "Choose and reorder from these facts" doesn't. The prompt is a contract.
- **LaTeX is worth it.** ATS parsers read the PDFs reliably, and the output looks consistent every time.
- **Track everything.** About 100 applications led to interviews at Meta, Google, Nokia, Arm, AMD, Bitvavo and SignalWire. I'd have lost track by week two without the sheet.
- **The CV isn't the bottleneck for long.** Once applications cost nothing, all the real work moves to interview prep: LeetCode, system design, and being able to explain your own projects clearly.

I ended up at SignalWire, working on real-time communication and voice AI. I couldn't have kept up that volume of applications by hand while working full time.
