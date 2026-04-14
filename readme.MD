# HNG i14 — Frontend Stage 1A · Todo Item Card

A testable, accessible, and responsive Todo Item Card built for the HNG Internship Stage 1A frontend task, extended from Stage 0.

---

## Live URL

> https://cctodoapp.netlify.app/

---

## Tech Stack

- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript
- Google Fonts — Bebas Neue, Fraunces, DM Mono

---

## What Changed from Stage 0

### New Features

- **Edit mode** — clicking Edit opens an inline form to update the title, description, priority, and due date. Save applies changes, Cancel restores the previous values. Escape key also cancels. Focus returns to the Edit button on close.
- **Status control** — a dropdown (`test-todo-status-control`) replaces the static status display, allowing manual selection of Pending, In Progress, or Done
- **Priority indicator** (`test-todo-priority-indicator`) — three dots in the card hero that visually reflect priority level: one green dot for Low, two gold for Medium, three red for High
- **Expand / collapse** — long descriptions are collapsed by default with a toggle button (`test-todo-expand-toggle`) that reveals the full text. Uses `aria-expanded` and `aria-controls` for accessibility
- **Overdue indicator** (`test-todo-overdue-indicator`) — a red alert banner that appears automatically when the task is past its due date
- **Granular time display** — time remaining now shows minutes, hours, or days granularly (e.g. "In 45 minutes", "Overdue by 2 hours") and updates every 30 seconds instead of 60
- **"Completed" state** — when status is Done, the time remaining stops updating and shows "Completed"

### Design Decisions

- Edit form is injected between the hero and card body so it stays in natural reading/tab order
- The Stage 0 `test-todo-status` badge is kept in the DOM (visually hidden) so all original testids remain valid
- Priority indicator lives in the hero alongside the priority badge for visual grouping
- Overdue banner uses `role="alert"` and `aria-live="assertive"` so screen readers announce it immediately

### Known Limitations

- Delete button still fires a browser alert — full delete logic is out of scope for this stage
- Edit form does not trap focus (focus trap is listed as a bonus requirement)

---

## Features

- All Stage 0 `data-testid` attributes still present and correct
- All Stage 1A `data-testid` attributes added and correct
- Real `<input type="checkbox">` synced bidirectionally with the status dropdown
- Checkbox, status control, and status badge all stay in sync at all times
- Done state → strikethrough title, muted card, "Completed" time label
- Overdue state → red side tab accent, red overdue banner, red time label
- Edit form fields all have `<label for="">` and accessible names
- Status dropdown has accessible name via `<label>` and `aria-label`
- Expand toggle uses `aria-expanded` and `aria-controls`
- Collapsible section has matching `id` for `aria-controls`
- `aria-live="polite"` on time remaining, `aria-live="assertive"` on overdue banner
- Keyboard tab order: Checkbox → Status control → Expand toggle → Edit → Delete → (Save / Cancel in edit mode)
- WCAG AA compliant color contrast throughout
- Responsive from 320px to 1200px — edit form fields stack vertically on mobile
- No layout breaking on long titles, wrapped tags, or long descriptions

---

## Accessibility Notes

- All form fields in the edit form have explicit `<label for="">` bindings
- Overdue banner uses `role="alert"` so it is announced immediately by screen readers without user interaction
- Expand/collapse toggle uses `aria-expanded` (true/false) and `aria-controls` pointing to the collapsible section's `id`
- Focus is returned to the Edit button when edit mode closes (save or cancel)
- Escape key closes edit mode and restores previous values

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

HNG Internship i14 — Frontend Stage 1A
Deadline: April 17, 2026
