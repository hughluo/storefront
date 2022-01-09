CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL CONSTRAINT positive_quantity CHECK (quantity > 0),
    order_id bigint NOT NULL REFERENCES orders(id),
    product_id bigint NOT NULL REFERENCES products(id)
);
