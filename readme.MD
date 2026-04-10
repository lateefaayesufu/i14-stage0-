# HNG i14 — Frontend Stage 0 · Todo Item Card

A testable, accessible, and responsive Todo Item Card built for the HNG Internship Stage 0 frontend task.

---

## Live URL

> Replace with your deployed URL

---

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript
- Google Fonts — Bebas Neue, Fraunces, DM Mono

---

## Features

- All required `data-testid` attributes present and correct
- Real `<input type="checkbox">` with visible label and `aria-label`
- Checkbox toggles title strikethrough and status badge to "Done"
- Live time remaining calculated from due date — updates every 60 seconds
- Friendly time text — "Due in X days", "Due tomorrow", "Overdue by X hours", "Due now!"
- Edit button logs to console, Delete button fires an alert
- Fully keyboard navigable — Tab → checkbox → edit → delete
- `aria-live="polite"` on time remaining for screen reader support
- WCAG AA compliant color contrast throughout
- Responsive from 320px to 1200px — no horizontal overflow
- Tags wrap cleanly with `flex-wrap`
- Entrance animation on card load

---

## How to Run Locally

```bash
git clone <your-repo-url>
cd <your-repo-folder>
open index.html
```

No build step. No dependencies. Just open the file in a browser.

---

## Submission

HNG Internship i14 — Frontend Stage 0
Deadline: April 16, 2026
