"use strict";

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const status = document.querySelector("#status");
const tasks = new Map();
let nextId = 1;

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
  row.append(label, completion);
  list.append(row);
}

input.addEventListener("input", () => input.setCustomValidity(""));

list.addEventListener("change", (event) => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  const row = event.target.closest("li");
  const task = tasks.get(row.dataset.id);
  task.completed = event.target.checked;
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
  renderTask(task);
  updateEmptyState();
  form.reset();
  input.focus();
  status.textContent = "Task added.";
});
