/* ─────────────────────────────────────────────
   Stage 1A — Todo Card Script
   ───────────────────────────────────────────── */

// ── State ──────────────────────────────────────
let state = {
  title: "Survive Monday Without Crying in the Bathroom",
  description:
    "Standup in 8 mins. Zero updates. One unfinished ticket. Three tabs of Stack Overflow. You are not okay but your camera is off and that's enough.",
  priority: "High", // "Low" | "Medium" | "High"
  status: "In Progress", // "Pending" | "In Progress" | "Done"
  due: new Date("2026-04-16T18:00:00Z"),
  isExpanded: false,
};

// Snapshot for cancel
let _snapshot = null;

// ── Element refs ────────────────────────────────
const card = document.querySelector('[data-testid="test-todo-card"]');
const titleEl = document.getElementById("task-title");
const descEl = document.querySelector('[data-testid="test-todo-description"]');
const priorityBadge = document.querySelector(
  '[data-testid="test-todo-priority"]',
);
const priorityInd = document.getElementById("priority-indicator");

const collapsible = document.getElementById("desc-collapsible");
const expandToggle = document.getElementById("expand-toggle");
const expandLabel = expandToggle.querySelector(".expand-label");

const overdueBanner = document.getElementById("overdue-indicator");

const editForm = document.getElementById("edit-form");
const editTitleIn = document.getElementById("edit-title-input");
const editDescIn = document.getElementById("edit-description-input");
const editPriIn = document.getElementById("edit-priority-select");
const editDueIn = document.getElementById("edit-due-date-input");
const saveBtn = document.getElementById("save-button");
const cancelBtn = document.getElementById("cancel-button");
const editBtn = document.getElementById("edit-button");

const checkbox = document.getElementById("complete-toggle");
const statusCtrl = document.querySelector(
  '[data-testid="test-todo-status-control"]',
);
const statusBadge = document.getElementById("task-status"); // Stage 0 testid
const checkRow = document.querySelector(".check-row");

const timeEl = document.getElementById("time-remaining");
const dueDateEl = document.getElementById("due-date-display");

// ── Description collapse ────────────────────────
const COLLAPSE_THRESHOLD = 120; // chars before we show toggle

function initCollapse() {
  // Reset before applying so classes don't stack on re-render
  collapsible.classList.remove("collapsed", "expanded");
  state.isExpanded = false;
  expandToggle.setAttribute("aria-expanded", "false");
  expandLabel.textContent = "Show more";

  if (state.description.length > COLLAPSE_THRESHOLD) {
    collapsible.classList.add("collapsed");
    expandToggle.classList.remove("hidden");
  } else {
    collapsible.classList.add("expanded");
    expandToggle.classList.add("hidden");
  }
}

expandToggle.addEventListener("click", () => {
  state.isExpanded = !state.isExpanded;
  if (state.isExpanded) {
    collapsible.classList.remove("collapsed");
    collapsible.classList.add("expanded");
    collapsible.setAttribute("aria-expanded", "true");
    expandToggle.setAttribute("aria-expanded", "true");
    expandLabel.textContent = "Show less";
  } else {
    collapsible.classList.remove("expanded");
    collapsible.classList.add("collapsed");
    collapsible.setAttribute("aria-expanded", "false");
    expandToggle.setAttribute("aria-expanded", "false");
    expandLabel.textContent = "Show more";
  }
});

// ── Priority indicator ──────────────────────────
function updatePriorityUI(priority) {
  const p = priority.toLowerCase(); // "low" | "medium" | "high"
  priorityBadge.textContent = `${priority} Priority`;
  priorityBadge.setAttribute("aria-label", `Priority: ${priority}`);
  priorityInd.className = `priority-indicator ${p}`;
  priorityInd.setAttribute("aria-label", `Priority level: ${priority}`);
}

// ── Status sync ─────────────────────────────────
function applyStatus(status, skipCheckbox = false) {
  state.status = status;

  // Sync status control select
  statusCtrl.value = status;
  statusCtrl.className =
    "status-select " + status.toLowerCase().replace(" ", "-");

  // Sync hidden Stage 0 badge
  statusBadge.textContent = status;
  statusBadge.setAttribute("aria-label", `Status: ${status}`);
  if (status === "Done") {
    statusBadge.classList.add("done");
  } else {
    statusBadge.classList.remove("done");
  }

  // Sync checkbox
  if (!skipCheckbox) {
    checkbox.checked = status === "Done";
  }

  // Title strikethrough
  if (status === "Done") {
    titleEl.classList.add("done");
    card.classList.add("is-done");
    checkRow.classList.remove("in-progress", "pending");
    checkRow.classList.add("done");
  } else if (status === "Pending") {
    titleEl.classList.remove("done");
    card.classList.remove("is-done");
    checkRow.classList.remove("done", "in-progress");
    checkRow.classList.add("pending");
  } else {
    titleEl.classList.remove("done");
    card.classList.remove("is-done");
    checkRow.classList.remove("done", "pending");
    checkRow.classList.add("in-progress");
  }

  // Update time display immediately on status change
  updateTime();
}

// ── Checkbox change ─────────────────────────────
checkbox.addEventListener("change", function () {
  if (this.checked) {
    applyStatus("Done", true);
  } else {
    applyStatus("Pending", true);
  }
});

// ── Status control change ───────────────────────
statusCtrl.addEventListener("change", function () {
  applyStatus(this.value);
});

// ── Time logic ──────────────────────────────────
function getTimeLabel() {
  if (state.status === "Done") {
    return { text: "Completed", cls: "completed" };
  }

  const diff = state.due - Date.now();
  const abs = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hrs = Math.floor(abs / 3600000);
  const days = Math.floor(abs / 86400000);

  if (abs < 60000) return { text: "Due now!", cls: "due-soon" };

  if (diff < 0) {
    if (mins < 60)
      return {
        text: `Overdue by ${mins} min${mins !== 1 ? "s" : ""}`,
        cls: "overdue",
      };
    if (hrs < 24)
      return {
        text: `Overdue by ${hrs} hr${hrs !== 1 ? "s" : ""}`,
        cls: "overdue",
      };
    return {
      text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`,
      cls: "overdue",
    };
  }

  if (mins < 60)
    return { text: `In ${mins} min${mins !== 1 ? "s" : ""}`, cls: "due-soon" };
  if (hrs < 24)
    return { text: `In ${hrs} hr${hrs !== 1 ? "s" : ""}`, cls: "due-soon" };
  if (days === 1) return { text: "Due tomorrow", cls: "" };
  return { text: `In ${days} days`, cls: "" };
}

function updateTime() {
  const { text, cls } = getTimeLabel();
  timeEl.textContent = text;
  timeEl.className = cls;

  // Overdue banner
  const isOverdue = cls === "overdue";
  overdueBanner.hidden = !isOverdue;
  if (isOverdue) {
    card.classList.add("is-overdue");
  } else {
    card.classList.remove("is-overdue");
  }
}

updateTime();
setInterval(updateTime, 30000);

// ── Edit mode ───────────────────────────────────
function openEditMode() {
  // Snapshot current state for cancel
  _snapshot = { ...state };

  // Populate form fields
  editTitleIn.value = state.title;
  editDescIn.value = state.description;
  editPriIn.value = state.priority;

  // Format due date for datetime-local input (local time)
  const d = state.due;
  const pad = (n) => String(n).padStart(2, "0");
  const localStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  editDueIn.value = localStr;

  // Show form, hide card body
  editForm.hidden = false;
  document.getElementById("card-body").hidden = true;

  // Focus first input
  editTitleIn.focus();
}

function closeEditMode(restoreSnapshot = false) {
  if (restoreSnapshot && _snapshot) {
    state = { ..._snapshot };
    renderFromState();
  }

  editForm.hidden = true;
  document.getElementById("card-body").hidden = false;

  // Return focus to edit button
  editBtn.focus();
}

function renderFromState() {
  titleEl.textContent = state.title;
  descEl.textContent = state.description;

  updatePriorityUI(state.priority);
  applyStatus(state.status);

  // Update due date display
  const d = state.due;
  const formatted = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  dueDateEl.textContent = formatted;
  dueDateEl.setAttribute("datetime", d.toISOString());
  timeEl.setAttribute("datetime", d.toISOString());

  initCollapse();
  updateTime();
}

editBtn.addEventListener("click", openEditMode);

saveBtn.addEventListener("click", () => {
  // Validate title not empty
  const newTitle = editTitleIn.value.trim();
  if (!newTitle) {
    editTitleIn.focus();
    editTitleIn.style.borderColor = "var(--red)";
    return;
  }
  editTitleIn.style.borderColor = "";

  state.title = newTitle;
  state.description = editDescIn.value.trim() || state.description;
  state.priority = editPriIn.value;

  // Parse due date
  const rawDate = editDueIn.value;
  if (rawDate) {
    state.due = new Date(rawDate);
  }

  renderFromState();
  closeEditMode(false);
});

cancelBtn.addEventListener("click", () => {
  closeEditMode(true);
});

// Keyboard: Escape cancels edit mode
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !editForm.hidden) {
    closeEditMode(true);
  }
});

// ── Init ────────────────────────────────────────
updatePriorityUI(state.priority);
applyStatus(state.status);
initCollapse();
