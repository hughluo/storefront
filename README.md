# Storefront Backend Project

## Local Development
* Run `npm install -g db-migrate` to install database migration.
* Run `npm install` to install packages.
* Run `export $(cat .env.dev | xargs) && docker-compose up --detach` to start the database.
* Run `npm run dev` to start the database via docker-compose, migrate the schema, and start the auto-reloading server, the server should be listening on port `3000` and the database should be listening on port `5434`, for the database credentials, see [`.env.dev`](./.env.dev)

## Test
* Run `export $(cat .env.test | xargs) && docker-compose up --detach` to start the database.
* Run `npm test`, run the test.

## Pre-commit
The following npm command will be executed before git commit. This is controlled by npm package [`pre-commit`](https://www.npmjs.com/package/pre-commit).
* Run `npm prettier` to format the code. For configuration, see[.prettierrc.json](./.prettierrc.json).
* Run `npm eslint` to lint the code. For configuration, see[.eslintrc.json](./.eslintrc.json).