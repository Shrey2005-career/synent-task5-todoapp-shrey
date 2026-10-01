"use strict";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const status = document.querySelector("#status");
const storageWarning = document.querySelector("#storage-warning");
const STORAGE_KEY = "synent-task5-tasks-v1";
const tasks = new Map();
let nextId = 1;

function warnAboutStorage(message) {
  storageWarning.hidden = false;
  storageWarning.textContent = message;
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...tasks.values()]));
    storageWarning.hidden = true;
    storageWarning.textContent = "";
  } catch {
    warnAboutStorage("Changes work in this tab but could not be saved. They may be lost on refresh.");
  }
}

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return;
    const items = JSON.parse(saved);
    if (!Array.isArray(items) || !items.every((item) =>
      item && typeof item.text === "string" && item.text.trim().length > 0
      && item.text.length <= 300 && typeof item.completed === "boolean"
    )) throw new Error("Invalid saved tasks");
    for (const item of items) {
      const task = { id: String(nextId++), text: item.text, completed: item.completed };
      tasks.set(task.id, task);
      renderTask(task);
    }
  } catch {
    warnAboutStorage("Saved tasks could not be loaded. You can still use the app; your next successful change will replace the saved list.");
  }
}

function updateEmptyState() {
  emptyState.hidden = tasks.size > 0;
}

function renderTask(task) {
  const row = document.createElement("li");
  row.dataset.id = task.id;
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  const text = document.createElement("span");
  text.textContent = task.text;
  const completion = document.createElement("span");
  completion.dataset.completion = "";
  completion.textContent = task.completed ? " (Completed)" : "";
  label.append(checkbox, " ", text);
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.dataset.action = "delete";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete task: ${task.text}`);
  row.append(label, completion, " ", deleteButton);
  list.append(row);
}

input.addEventListener("input", () => input.setCustomValidity(""));

list.addEventListener("click", (event) => {
  const button = event.target.closest('button[data-action="delete"]');
  if (!button) return;
  const row = button.closest("li");
  const focusTarget = row.nextElementSibling?.querySelector("button")
    ?? row.previousElementSibling?.querySelector("button") ?? input;
  tasks.delete(row.dataset.id);
  row.remove();
  saveTasks();
  updateEmptyState();
  focusTarget.focus();
  status.textContent = "Task deleted.";
});

list.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  const row = event.target.closest("li");
  const task = tasks.get(row.dataset.id);
  task.completed = event.target.checked;
  saveTasks();
  row.querySelector("[data-completion]").textContent = task.completed ? " (Completed)" : "";
  status.textContent = task.completed ? "Task completed." : "Task marked incomplete.";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) {
    input.setCustomValidity("Enter a task, not just spaces.");
    input.reportValidity();
    return;
  }
  const task = { id: String(nextId++), text, completed: false };
  tasks.set(task.id, task);
  saveTasks();
  renderTask(task);
  updateEmptyState();
  form.reset();
  input.focus();
  status.textContent = "Task added.";
});

loadTasks();
updateEmptyState();
