# Notes regarding the assigment

## Authentication layer

Authentication/user management has not been implemented at all.

Although the DB structure is such that it will allow for separating Grant matches and User Submissions. The table Submissions will need a "userId" field which will denote that the submission was made by a specific user.

## GraphQL layer

GraphQL layer was splitted into its own package that is being shared between the server and client applications.

Although the current structure works, in real world production, may need a more complex setup.

Ideally, the package would be published to a package registry and both the server and client applications would depend on it.

## Testing

The server has is mostly covered by the end to end suite which is designed to be fully end to end but to cover fewer scenarios. More unit tests are needed though for each individual module.

On the client, I've tried to test mostly functionality. More end to end tests are needed.
