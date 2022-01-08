# Storefront Backend Project

## Local Development
* Create a `.env` file like the one below:
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_dev
POSTGRES_USER=wexort
POSTGRES_PASSWORD=my-super-secret-password
```
* Run `docker-compose up` to start database.
* Run `npm install -g db-migrate` to install database migration.
* Run `db-migrate up` to migrate the database.