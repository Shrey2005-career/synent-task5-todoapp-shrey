# Project Report — To-Do List Web App

## Objective

Create a lightweight task-management application that allows users to add, complete, and delete tasks while retaining their data between browser sessions with `localStorage`.

## Methodology

The application was developed in small functional stages: semantic interface structure, task creation, completion toggling, deletion, and persistence. Tasks are stored as structured data and rendered with DOM methods rather than HTML strings. Styling was added after the core behavior was working, with responsive layouts and keyboard accessibility kept in scope.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`

## Features and testing

- Add tasks with the button or Enter key
- Mark tasks as complete or active
- Delete individual tasks
- Restore saved tasks after a refresh
- Reject empty input and limit task length
- Report storage failures while preserving in-memory behavior
- Responsive layout and visible keyboard focus

Manual testing covered task creation, completion, reopening, deletion, refresh persistence, invalid input, literal rendering of HTML-like text, long content, and keyboard-only operation.

## Outcome

The completed application satisfies the required task-management features without a framework or backend. It remains small, responsive, accessible, and usable even if browser storage becomes unavailable.
