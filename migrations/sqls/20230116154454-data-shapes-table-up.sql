
CREATE TABLE products_table (Product_id SERIAL PRIMARY KEY, name VARCHAR(50), price integer, category VARCHAR(50));

CREATE TABLE user_table (user_id SERIAL PRIMARY KEY, first_name VARCHAR(20), last_name VARCHAR(20), password VARCHAR(100));

CREATE TABLE orders_table (order_id SERIAL PRIMARY KEY, user_id integer, FOREIGN KEY(user_id) REFERENCES user_table(user_id), status boolean);

CREATE TABLE order_products (id SERIAL PRIMARY KEY, quantity integer, order_id integer, product_id integer, FOREIGN KEY(order_id) REFERENCES orders_table(order_id), FOREIGN KEY (product_id) REFERENCES products_table(product_id));
