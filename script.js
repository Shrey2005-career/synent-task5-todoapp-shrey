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
  const text = document.createElement("span");
  text.textContent = task.text;
  row.append(text);
  list.append(row);
}

input.addEventListener("input", () => input.setCustomValidity(""));

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
