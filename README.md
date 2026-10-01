# To-do list — Synent Task 5

A lightweight HTML and vanilla JavaScript task manager. Visual styling is
intentionally deferred; controls use the browser's default appearance.

## Run

From this folder in PowerShell:

```powershell
python -m http.server 4175 --bind 127.0.0.1
```

Open http://localhost:4175. No dependencies or build step are required.

## Implementation slices

1. Semantic HTML and accessible native controls.
2. Task creation and empty-state feedback.
3. Task completion toggles.
4. Task deletion.
5. localStorage persistence, recovery, and verification.

## Behavior

- Add with the button or Enter; whitespace-only tasks are rejected.
- Toggle a labeled checkbox to complete or reopen a task.
- Delete a task immediately; keyboard focus moves to an adjacent delete button
  or the input when the list becomes empty.
- Changes persist under `synent-task5-tasks-v1` in localStorage.
- Task text is rendered as text, never HTML. Maximum length: 300 characters.
- Storage errors are reported without disabling in-memory functionality.

Data belongs to this browser and origin (protocol, hostname, and port).
Use the same URL on each visit. Clearing browser data removes tasks. There is
no backend, account, cross-device sync, or multi-tab conflict resolution; the
last tab to save wins. A damaged saved list is replaced on the next successful
change, not silently overwritten on page load.

## Manual verification

1. Add two tasks, including one using Enter. Check whitespace-only rejection.
2. Enter `<b>Read</b>` and confirm it appears literally, not as HTML.
3. Complete a task, refresh, and verify its text and checked state remain.
4. Reopen it, refresh, and verify the change persists.
5. Delete tasks, refresh, and verify deletions and the empty state persist.
6. Use Tab, Space, and Enter to operate all controls without a mouse.
