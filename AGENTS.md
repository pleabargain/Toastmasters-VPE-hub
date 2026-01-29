# AGENTS.md - Project Context and Rules

## Project Overview
- **Framework:** Vite + React + TypeScript (preferred).
- **Backend:** Firebase Firestore (NoSQL, collections, and documents).
- **Hosting:** Firebase Hosting.
- **Goal:** Build a SPA and deploy it on Firebase.

## Setup & Development Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start Vite development server (usually port 5173).
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint and TypeScript checks.

## Firestore & Firebase Guidelines
- **SDK:** Use `firebase/app` and `firebase/firestore`.
- **Initialization:** Use `src/firebase.ts` to initialize Firebase.
- **Data Model:** Firestore stores data in collections of documents (JSON-like, max 1MB per document) [12].
- **Security:** Ensure all data operations are secured via `firestore.rules`.
- **Querying:** Use Modular SDK v9/v10 (`getDoc`, `collection`, `query`, `where`).

## Deployment Rules (Firebase Hosting)
- **Deployment Command:** `firebase deploy` (assumes CLI is set up).
- **Build Output:** Vite must output files to a `dist` folder.
- **Config:** `firebase.json` should set `public` to `"dist"` and `ignore` `node_modules`, `.git`, `firebase.json`.
- **SPA Rewrite:** `firebase.json` must have `rewrites` to `index.html` to handle routing [10, 11].

## Testing & Quality Rules
- **Unit Tests:** Always create unit tests for all major functions using Vitest (preferred).
- **Initial Data:** Ensure that when the server starts (or app loads), there is visible data on the home page/dashboard. Mock data should be populated if the database is empty.
- **Verification Rule:** Test that the home page contains at least one record or visible metric upon initial load to ensure the data layer is operational.

## Coding Standards
- Use TypeScript for type safety in Firestore data models.
- Modularize UI components in `src/components`.
- Use environment variables (`.env`) for Firebase configuration keys (prefixed with `VITE_`).
- Always run `npm run lint` and `npm run build` before finalizing changes to ensure CI/CD success [1].

## Prohibited Actions
- Do not check in Firebase API keys or credentials.
- Do not create unindexed queries on large collections.
