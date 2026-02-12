# Client Application

This is the frontend application for the Vee platform, built with modern web technologies.

## Stack

- **Framework**: [Next.js](https://nextjs.org/) (v16)
- **Language**: TypeScript
- **State Management / Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)

## Project Structure

The project follows a feature-based architecture within the `src` directory:

- **`features/`**: Domain-specific modules containing logic and components for specific business capabilities.
  - `AllOpportunities`: Components and logic for viewing opportunities.
  - `NewMatches`: Logic for handling new grant matches.
- **`components/`**: Shared, reusable UI components used across the application (e.g., `Table`, `ConfirmationModal`).
- **`lib/`**: Configuration and utility files, including the Apollo Client setup.
- **`pages/`**: Next.js pages and routing.

## Apollo & Type Integration

The application uses Apollo Client to interact with the backend GraphQL API.

- **Client Setup**: Configured in `src/lib/apollo-client.ts` and provided via `ApolloProvider` in `_app.tsx`.
- **Type Safety**: TypeScript types for GraphQL entities (e.g., `Grant`) are imported directly from the shared `graphql-server` package.
- **Hooks**: Custom hooks (in `features/**/hooks`) encapsulate queries and mutations, using these shared types to ensure type safety for data and variables.
