# AGENTS.md

> **CONTEXT FOR LLMs / AGENTS**
> This file contains high-level context about the Vee Monorepo. Use this to quickly understand the project structure, stack, and development workflows.
> **MAINTENANCE PROTOCOL**: If you modify the project structure, add new global dependencies, or change the build/dev process, you MUST update this file and the relevant READMEs.

## Project Overview

**Vee** is a full-stack platform using a monorepo structure.

- **Client**: Next.js (React), Apollo Client, Tailwind CSS.
- **Server**: NestJS, TypeORM, PostgreSQL, GraphQL (Schema-First), Apollo Server.
- **Shared**: `graphql-server` package for schema definition and type sharing.
- **Infrastructure**: Docker for local dev and production simulation.

## Architecture Map

```mermaid
graph TD
    Client[apps/client (Next.js)]
    Server[apps/server (NestJS)]
    Shared[packages/graphql-server]
    DB[(PostgreSQL)]

    Client -- GraphQL Queries --> Server
    Server -- TypeORM --> DB
    Client -. Imports Types .-> Shared
    Server -. Loads Schema .-> Shared
```

## detailed Project Structure

| Path                      | Stack / Tech                 | Key Purpose                                                                   |
| :------------------------ | :--------------------------- | :---------------------------------------------------------------------------- |
| `apps/client`             | Next.js 16, Apollo, Tailwind | Frontend application. Features organized by domain.                           |
| `apps/server`             | NestJS 11, TypeORM, GraphQL  | Backend API. Schema-first GraphQL.                                            |
| `packages/graphql-server` | GraphQL SDL, Code Gen        | Single Source of Truth for GraphQL schema.                                    |
| `docker`                  | Docker Compose               | Local DB (`docker-compose.yml`) & Prod Sim (`docker-compose.production.yml`). |

## Key Concepts

### 1. GraphQL Schema First

- **Schema Definition**: Located in `packages/graphql-server/schema.graphql`.
- **Type Generation**: Types are generated via `npm run generate` (or automatically in dev).
- **Consolidated Types**: Both Client and Server import generated types (`Grant`, `Submission`, etc.) from `graphql-server`.
- **Server Implementation**: `apps/server` implements resolvers matching the `schema.graphql`.

### 2. Database & Migrations

- **ORM**: TypeORM.
- **Migrations**: Stored in `apps/server/src/migrations` (TS files).
- **Test Database**: E2E tests in `apps/server` use `testcontainers` to spin up isolated Postgres instances.
- **Seeding**: `npm run seed --workspace=server` populates initial data.

## Development Workflow

1.  **Start Infra**: `npm run dc -- up -d` (Starts Postgres)
2.  **Dev Server**: `npm run dev` (Starts Client :3001, Server :3000)
    - _Note_: Server auto-generates types on start if schema changes.

## Production Simulation

To verify the full production build (including Docker builds, migrations, seeding):
`npm run dc-prod -- up --build`

## Common Tasks / Commands

- **Add a new feature**:
  1.  Modify `packages/graphql-server/schema.graphql`.
  2.  Run `npm run generate` (or let `dev` run).
  3.  Implement Resolver in `apps/server`.
  4.  Implement Component/Page in `apps/client` using generated types.
- **Database Migration**:
  - Generate: `npm run migration:generate --name=Name --workspace=server`
  - Run: `npm run migration:run --workspace=server`
