# Notes regarding the assigment

These are my notes about some of the decisions I've made while working on the assignment.

## Database structure

I've created two separate entities for the Grant matches and the Grant submissions. The idea is that a Grant can be shown to multiple users and a user can have multiple Grant submissions.

- **Grant table**: Each record in this table represents a funding opportunity.

- **Submission table**: Each record in this table represents a submission made by a user for a specific grant.

## Authentication layer

Authentication/user management has not been implemented at all.

Although the DB structure is such that it will allow for separating Grant matches and User Submissions. The table Submissions will need a "userId" field which will denote that the submission was made by a specific user.

## GraphQL layer

GraphQL layer was splitted into its own package that is being shared between the server and client applications.

Although the current structure works, in a real world production state, may need a more complex setup.

Ideally, the package would be published to a package registry and both the server and client applications would depend on it. Another option would be to let the client generate its own types from the server schema on build time.

## Testing

The server has is mostly covered by the end to end suite which is designed to be fully end to end but to cover fewer scenarios. More unit tests are needed though for each individual module.

On the client, I've tried to test mostly functionality. More end to end tests are needed.

## Env variables management

I've used dotenv to manage environment variables. As it is now, not much configuration is needed as the default values are being used everywhere. But the application is able to consume env variables from the environment.
