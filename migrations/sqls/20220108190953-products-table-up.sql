CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
    price integer NOT NULL CONSTRAINT positive_price CHECK (price > 0)
);
