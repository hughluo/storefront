# Storefront Backend Project

## Local Development
* Create a `.env` file like the one below:
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_USER=wexort
POSTGRES_PASSWORD=VWbdx3zLR82jq8BL

PEPPER=vhSvmVz9Nbmyrccg
SALT_ROUNDS=10

JWT_SECRET=v98Z9fh2EtJADbPa

TEST_FIRSTNAME=John
TEST_LASTNAME=Doe
TEST_EMAIL=john.doe@email.com
TEST_PASSWORD=easy-come-easy-go
TEST_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMiwidXNlcm5hbWUiOiJ0b20iLCJwYXNzd29yZF9kaWdlc3QiOiIkMmIkMTAkSWkzRjJTZm5wVkFqdzBzQ2ZGOERqT0VsQlJRbnRtd3Y4akdaUG1SaHY5Wm1BN2pEdjZPUXUifSwiaWF0IjoxNjQxNjc2OTkzfQ.HE6jqlCrii0abXaV-gADuUYDFjpH0BItto2QLvQZtYM
```
* Run `docker-compose up` to start database, the database should be listening on port `5432`.
* Run `npm install -g db-migrate` to install database migration.
* Run `npm install` to install dependencies.
* Run `db-migrate up` to migrate the database.
* Run `npm run watch` to start the auto-reloading server, the server should be listening on port `3000`.

## Pre-commit
The following npm command will be executed before git commit. This is controlled by npm package [`pre-commit`](https://www.npmjs.com/package/pre-commit).
* Run `npm prettier` to format the code. For configuration, see[.prettierrc.json](./.prettierrc.json).
* Run `npm eslint` to lint the code. For configuration, see[.eslintrc.json](./.eslintrc.json).
* Run `npm test` to run tests powered by [`Jasmine`](https://www.npmjs.com/package/jasmine). For configuration, see [jasmine.json](./spec/support/jasmine.json). For reporter configuration, see [reporter.ts](./src/tests/helpers/reporter.ts).