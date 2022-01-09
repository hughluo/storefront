CREATE TYPE order_status AS ENUM ('active', 'inactive');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_status VARCHAR(15) NOT NULL,
    user_id integer NOT NULL REFERENCES users(id)
);
