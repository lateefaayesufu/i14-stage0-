const DUE = new Date("2026-04-16T18:00:00Z");

function getTimeLabel() {
  const diff = DUE - Date.now();
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
        text: `Overdue by ${hrs} hour${hrs !== 1 ? "s" : ""}`,
        cls: "overdue",
      };
    return {
      text: `Overdue by ${days} day${days !== 1 ? "s" : ""}`,
      cls: "overdue",
    };
  }
  if (mins < 60)
    return {
      text: `In ${mins} min${mins !== 1 ? "s" : ""}`,
      cls: "due-soon",
    };
  if (hrs < 24)
    return {
      text: `In ${hrs} hour${hrs !== 1 ? "s" : ""}`,
      cls: "due-soon",
    };
  if (days === 1) return { text: "Due tomorrow", cls: "" };
  return { text: `In ${days} days`, cls: "" };
}

function updateTime() {
  const el = document.getElementById("time-remaining");
  if (!el) return;
  const { text, cls } = getTimeLabel();
  el.textContent = text;
  el.className = cls;
}

updateTime();
setInterval(updateTime, 60000);

const cb = document.getElementById("complete-toggle");
const title = document.getElementById("task-title");
const status = document.getElementById("task-status");

cb.addEventListener("change", function () {
  if (this.checked) {
    title.classList.add("done");
    status.textContent = "Done";
    status.classList.add("done");
    status.setAttribute("aria-label", "Status: Done");
  } else {
    title.classList.remove("done");
    status.textContent = "In Progress";
    status.classList.remove("done");
    status.setAttribute("aria-label", "Status: In Progress");
  }
});
