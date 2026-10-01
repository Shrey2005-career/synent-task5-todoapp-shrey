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
