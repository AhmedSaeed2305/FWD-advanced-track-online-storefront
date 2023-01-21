# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index "/products" [GET]
- Show "/product?id=" [GET]
- Create [token required] "/new-product" [POST]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] "/users" [GET]
- Show [token required] "user?id=" [GET]
- Create N[token required] "/new-user" [POST]

#### Orders

- Show all orders by user Id [Token required] "/orders?id=" [GET]
- Create new order [token required] "new-order" [POST]
- Current Order by user (args: user id)[token required] "/order/user-id?id=" [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## schema structure

1 - Table: user_table(user_id: serial perimary key, first_name: varchar, last_name: varchar, password: varchar)
2 - Table: products_table(product_id: serial perimary key, name: varchar, price: integer, category: varchar)
3 - Table: orders_table(id: serial perimary key, quantity: integer, status: boolean, user_id: integer [references user_table], product_id: integer [references products_table])
4 - Table: orders_product(id: serial perimary key, quantity: integer, order_id: integer [references orders_table], product_id: integer [references products_table])
