# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
**Note**: Some endpoints required JWT(JSON Web Token), see [.env.dev](./.env.dev) for a test JWT. 
You can create a user use that JWT via `POST \users` and get JWT for a user via `\auth` endpoint.
#### Products
- Index: `GET \products`
- Show: `GET \products\:id`
- Create [JWT required]: `POST \products`, with JSON format with fields `name`, `price` in request body.

#### Users
- Index [JWT required]: `GET \users`
- Show [JWT required]: `GET \users\:id`
- Create: `POST \users`, with JSON format request body with fields `email`, `firstname`, `lastname`, `password`, if success, a JWT for the user will be returned.
- Auth: `POST \auth`, with JSON format request body with fields `email`, `password`. If success, a JWT for the user will be returned.

#### Orders
- Current Order by user (args: user id)[JWT required]: `GET \orders?userId=<userId>`, replace `<userId>` with the correct userId.

## Data Shapes
#### Product
-  id
- name
- price

For schema, see [create-table-products](./migrations/sqls/20220108190953-products-table-up.sql).

#### User
- id
- firstName
- lastName
- password

For schema, see [create-table-users](./migrations/sqls/20220108190524-users-table-up.sql).

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

For schema, see [create-table-orders](./migrations/sqls/20220108191038-orders-table-up.sql) and [create-table-order-products](./migrations/sqls/20220108191140-order-products-table-up.sql).

