# Kanban Board

A Kanban-style task management app built with **React**, **Zustand**, **React Query**, and **Material UI**.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite + TypeScript | UI framework & build tool |
| Material UI (MUI) | Component library |
| React Query | Data fetching & caching |
| Zustand | UI state (search, pagination) |
| dnd-kit | Drag-and-drop |
| json-server | Local mock REST API |

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the mock API

```bash
npm run api
```

> Runs json-server on **http://localhost:4000** using `db.json` as the data source.

### 3. Start the dev server

```bash
npm run dev
```

> Opens the app at **http://localhost:5173**

---

## Features

- **4 columns** — To Do, In Progress, In Review, Done
- **Create tasks** — Click "+ Add task" in any column
- **Edit tasks** — Click the edit icon on any card
- **Delete tasks** — Click the delete icon → confirm in popup
- **Drag & drop** — Move cards between columns
- **Search** — Filter cards by title or description in real time
- **Pagination** — 5 tasks shown per column, "Load more" reveals extra
- **Caching** — React Query caches data for 30 seconds

## Project Structure

```
src/
├── api/          # Axios API client
├── components/   # React components (Board, Column, Card, Modal, Header)
├── hooks/        # React Query hooks
├── store/        # Zustand store
├── types/        # TypeScript interfaces
└── theme.ts      # MUI custom theme
db.json           # Mock database (json-server)
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run api` | Start json-server mock API |
| `npm run build` | Build production bundle |