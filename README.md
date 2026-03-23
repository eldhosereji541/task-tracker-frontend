# Task Tracker — Frontend

Next.js frontend for the Task Tracker application. Communicates with the [task-tracker-backend](../task-tracker-backend) via GraphQL.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Apollo Client** — GraphQL data fetching
- **Tailwind CSS v4** — styling
- **TypeScript**
- **Docker** — containerised dev environment

## Prerequisites

- [Node.js 20+](https://nodejs.org/) (for local dev without Docker)
- [Docker](https://www.docker.com/) + Docker Compose (for Docker dev)
- Backend running at `http://localhost:8080` (see [task-tracker-backend](../task-tracker-backend))

## Getting Started

### Option 1 — Docker (recommended)

The dev container mounts your source code, so changes hot-reload automatically.

```bash
docker compose up --build
```

App available at [http://localhost:3000](http://localhost:3000).

To stop:

```bash
docker compose down
```

> **VSCode :** The dev container starts automatically when you open this folder, via `.vscode/tasks.json`. 

### Option 2 — Local

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
cp .env.example .env.local
```

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_GRAPHQL_URL` | `http://localhost:8080/query` | Backend GraphQL endpoint |

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (wraps with ApolloProvider)
│   ├── page.tsx            # Login / Register page (/)
│   ├── providers.tsx       # Apollo Client provider
│   └── tasks/
│       └── page.tsx        # Task management page (/tasks)
├── src/
│   ├── components/
│   │   ├── Header.tsx      # Top nav with logout
│   │   ├── TaskForm.tsx    # Create task sidebar form
│   │   ├── TaskItem.tsx    # Individual task card
│   │   └── TaskList.tsx    # Task list with filters
│   ├── lib/
│   │   ├── apollo.ts       # Apollo Client setup (auth link + HTTP link)
│   │   └── graphql.ts      # GraphQL queries and mutations
│   └── types.ts            # Shared TypeScript types (Task, Priority, Status)
├── docker/
│   ├── Dockerfile          # Production image
│   └── Dockerfile.dev      # Development image (hot reload)
├── docker-compose.yml
└── .env.example
```

## Features

- **Authentication** — Register and login with JWT stored in `localStorage`
- **Task management** — Create, update status, and delete tasks
- **Filtering** — Filter tasks by status (TODO / IN_PROGRESS / COMPLETED) and priority (LOW / MEDIUM / HIGH)
- **Responsive layout** — Sidebar form + scrollable task list
