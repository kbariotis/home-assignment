# Server Application

This is the backend application for the Vee platform, built with [NestJS](https://nestjs.com/). It provides a GraphQL API to the client.

## Stack

- **Framework**: [NestJS](https://nestjs.com/) (v11)
- **Language**: TypeScript
- **Database**: PostgreSQL (v16)
- **ORM**: [TypeORM](https://typeorm.io/)
- **API**: GraphQL (Schema First) used with Apollo Server

## Project Structure

The project follows a modular architecture:

- **`src/app.module.ts`**: The root module that imports feature modules and configures global providers (Database, GraphQL).
- **`src/grants/`**: Feature module for management of logic for Grants.
- **`src/health/`**: Feature module for health checks.
- **`src/interceptors/`**: Global interceptors, such as `ApplicationErrorInterceptor` for standardized error handling.
- **`src/config/`**: Configuration files (e.g., database configuration).
- **`test/`**: End-to-end (E2E) tests.

## GraphQL Integration

The server uses a **Schema First** approach, integrating with the shared `graphql-server` package to ensure consistency between client and server.

- **Schema Loading**: The GraphQL schema is loaded from `SCHEMA_PATH` provided by the `graphql-server` package.
- **Type Generation**: TypeScript definitions are automatically generated to `DEFINITIONS_PATH` (also from `graphql-server`) during development, ensuring the implementations match the schema.
- **Configuration**: This setup is found in `src/app.module.ts` within the `GraphQLModule.forRoot` configuration.

## Error Handling

Global error handling is implemented using the `ApplicationErrorInterceptor`.

- This interceptor wraps exceptions and ensures a consistent error response format across the API.
- It is registered globally in `app.module.ts`.

## End-to-End (E2E) Tests

The E2E test suite focuses on testing the application flows with a real database.

- **Isolation**: Uses `testcontainers` to spin up a dedicated PostgreSQL Docker container for each test run, ensuring complete isolation and reproducibility.
- **Setup**: The `TestDbSetup` class (`test/test-db.setup.ts`) handles starting the container, connecting TypeORM, and running migrations before tests begin.
- **Running Tests**:
  ```bash
  npm run test:e2e
  ```
