# Requirements

This document is extracted from [reqs.pdf](file:///Users/user/code/vee/reqs.pdf).

## Overview

Grants dashboard - it's a dashboard that shows customers the grant opportunities offered (the card view) for them and the historical grants they approved as relevant (the table view).

![Page 1](file:///Users/user/code/vee/docs/reqs/page1.png)

## BE Requirements

- **Technical:**
  - Framework: **NestJS**
  - API: **GraphQL (schema-first approach)**
  - Language: **TypeScript**
  - Database: Any (e.g., PostgreSQL/MongoDB) using Docker
  - Documentation: Well-explained README
  - Consistency: Return consistent and predictable responses for FE consumption

## Evaluation Criteria

- Correct usage of NestJS and GraphQL schema-first architecture.
- Proper separation of concerns (modules, resolvers, services, domain logic).
- Clean project structure and maintainable code organization.
- Correct persistence strategy and data modeling.
- Presence and quality of automated tests.
- Docker configuration quality and reproducibility.
- Code readability, naming consistency, and clarity.

![Page 2](file:///Users/user/code/vee/docs/reqs/page2.png)

## FE Requirements

- **Technical:**
  - Stack: Any React stack (**Next.js encouraged**)
  - Tools: Any library for state management, components, etc.
  - Design: Implement the UI as close as possible to the provided screenshot.
- **Functional:**
  - Each opportunity is displayed as a card.
  - Clickable actions: Thumbs Up (👍) and Thumbs Down (👎).
  - Interaction: Clicking either icon triggers a feedback input field.
  - Submission: Feedback is saved; if 👍, the opportunity moves to the "All Grant Opportunities" table; if 👎, it disappears from the cards view.

## General Requirements

- Use standard UI practices for UX gaps.
- Dockerized setup for both BE and FE.
