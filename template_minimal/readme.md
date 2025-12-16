# Minimal template (what it shows)

A **lab.js + JATOS experiment skeleton** that demonstrates:

- **Global setup:** testing flag, progress bar counter, URL params, and an *expert* condition toggle.
- **Participant routing:** reads `PROLIFIC_PID` / `condExpert`; requires a real PID for Prolific participants, generates a fake PID for experts.
- **Study flow:** greetings → informed consent (abort if no consent) → exclusion + attention checks (skipped for experts) → main tasks (randomized sustainability reflection with timed lockout, scenario brainstorming + min. 4 + edit/delete, scenario relevance ratings) → Likert scales (with paradata click counts) → sociodemographics → feedback → ending/redirect.
- **Data handling:** writes to the lab.js datastore and submits results to **JATOS** at multiple checkpoints; ends/redirects (Prolific completion link) or aborts on integrity checks.
- **Frontend:** minimal HTML loader wiring scripts/styles + a potential fixed bottom **progress bar**.