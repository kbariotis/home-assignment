# Vee Home Assignment

## Project Structure

This project follows a monorepo structure with the following directories:

- **[Client Application](./apps/client/README.md)**: A Next.js frontend application.
- **[Server Application](./apps/server/README.md)**: A NestJS backend application.
- **[Docker Configuration](./docker/README.md)**: Docker configurations for development and production.
- **[GraphQL Package](./packages/graphql-server/README.md)**: Shared GraphQL schema and type definitions.

## Available Commands

Here are some of the main commands defined in `package.json`:

- `npm run build`: Build all applications using Turbo.
- `npm run dev`: Start all applications in development mode.
- `npm run generate`: Generate GraphQL types (if needed).
- `npm run dc -- <args>`: Execute `docker-compose` commands with the local development configuration.
- `npm run dc-prod -- <args>`: Execute `docker-compose` commands with the production simulation configuration.

## Getting Started (Development)

To set up the project locally for development:

1.  **Install dependencies**:

    ```bash
    npm install
    ```

2.  **Start Infrastructure (PostgreSQL)**:
    Start the database container using Docker.

    ```bash
    npm run dc -- up -d
    ```

3.  **Run Migrations**:
    Apply database migrations.

    ```bash
    npm run migration:run --workspace=server
    ```

4.  **Seed Database**:
    Populate the database with initial data.

    ```bash
    npm run seed --workspace=server
    ```

5.  **Start Applications**:
    Run the client and server in development mode.
    ```bash
    npm run dev
    ```

The application will be accessible at `http://localhost:3001` (frontend).

## Getting Started (Production Simulation)

This project includes a Docker Compose configuration that fully replicates a production environment, including running migrations and seeding the database automatically.

To start the production simulation:

```bash
npm run dc-prod -- up --build
```

This will build and start the database, backend, and frontend containers. The application will be accessible at `http://localhost:3001` (frontend).
