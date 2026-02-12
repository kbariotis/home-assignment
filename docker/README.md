# Docker Setup

This directory contains the Docker configuration for the Vee platform.

## Local Development

### `docker-compose.yml`

This file is used for local development to spin up the required infrastructure (PostgreSQL database).

- **Service**: `database`
- **Image**: `postgres:16-alpine`
- **Port**: `5432`
- **Data Persistence**: Data is stored locally in `.docker-data/postgres`.

## Production Simulation

### `docker-compose.production.yml`

This file provides a complete replication of the production environment, orchestrating all services including the database, backend, frontend, and initialization tasks.

- **Services**:
  - `database`: The PostgreSQL production database.
  - `update-db`: An ephemeral container that runs database migrations (`typeorm migration:run`).
  - `seed-db`: An ephemeral container that seeds the database with initial data.
  - `server`: The NestJS backend application.
  - `client`: The Next.js frontend application.

- **Orchestration**:
  - The `server` waits for `update-db` to complete ensuring the schema is up-to-date.
  - The `seed-db` also runs after `update-db` to populate data.
  - The `client` receives the `API_URL` as a build argument and connects to the server.
