CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) NOT NULL,
    user_id integer NOT NULL REFERENCES users(id)
);
