
CREATE TABLE products_table (Product_id SERIAL PRIMARY KEY, name VARCHAR(50), price integer, category VARCHAR(100));

CREATE TABLE user_table (user_id SERIAL PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), password VARCHAR(20));

CREATE TABLE orders_table (id SERIAL PRIMARY KEY, quantity integer, product_id integer, user_id integer, status boolean);

ALTER TABLE orders_table ADD FOREIGN KEY (product_id) REFERENCES products_table(product_id);

ALTER TABLE orders_table ADD FOREIGN KEY (user_id) REFERENCES user_table(user_id);
