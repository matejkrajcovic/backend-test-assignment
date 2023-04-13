## Description

Nest.js implementation of [test assignment](https://github.com/VESTBERRY/Test-backend-assignment/tree/master).

Features:

- Prisma used as ORM with migrations
- registration and login endpoints

  - `POST` http://localhost:3000/auth/register
    ```json
    {
      "email": "email@gmail.com",
      "password": "123456asdASDasd7#"
    }
    ```
  - `POST` http://localhost:3000/auth/signin
    ```json
    {
      "email": "email@gmail.com",
      "password": "123456asdASDasd7#"
    }
    ```
    Returns JWT that should be sent in HTTP header to authorize.
    Example header in GraphQL Playground:
    ```json
    {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVtYWlsQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNjgxMzg3MjE1LCJleHAiOjE2ODEzOTQ0MTV9.X-YcJeOs2Y_b-89fP6clreuQLGTbuGrYjz-_7F79t6U"
    }
    ```

- GraphQL endpoint http://localhost:3000/graphql with Playground running at same endpoint
  - `books` query available for anonymous users
    - searching by `author` or `title`
    - cursor pagination with `cursor` and `take` arguments
    - `bookVersions` field returns past versions of books, available only to logged in users
  - `createBook`, `updateBook` and `deleteBook` mutations available only to logged in users

Not implemented:

- tests

## Installation

```bash
$ yarn
```

## Database

Run this command to create Postgres Docker container:

```bash
$ docker create -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=postgres --name vestberry-backend-assignment postgres
```

And start it:

```bash
$ docker start vestberry-backend-assignment
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
