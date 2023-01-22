CREATE TABLE orders_table (order_id SERIAL PRIMARY KEY, user_id integer, FOREIGN KEY(user_id) REFERENCES user_table(user_id), status boolean);
