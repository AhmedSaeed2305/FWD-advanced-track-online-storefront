import { client } from "../database";

export type Order = {
  orderId: number;
  quantity: number;
  status: boolean;
  checkStatus: string;
  productId: number;
  userId: number;
};

export class OrderStore {
  // list all orders for the same user with User ID
  async index(userId: string): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders_table WHERE user_id=${userId};`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get requested orders list, error: ${err}`);
    }
  }
  // show current order by user with User ID
  async show(userId: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders_table WHERE user_id=${userId} ORDER BY order_id DESC LIMIT 1;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't get requested order, error: ${err}`);
    }
  }
  // create new orders
  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const orderSql = `INSERT INTO orders_table (status, user_id) VALUES (${order.status}, ${order.userId}) RETURNING *;`;
      const orderResult = await conn.query(orderSql);
      const productSql = `INSERT INTO order_products (quantity, product_id, order_id) VALUES (${order.quantity}, ${order.productId}, ${orderResult.rows[0].order_id}) RETURNING *;`;
      const detailsResult = await conn.query(productSql);
      conn.release();
      return detailsResult.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create new order, error: ${err}`);
    }
  }

  async addProducts(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES (${order.quantity}, ${order.orderId}, ${order.productId}) RETURNING *;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't add product, error: ${err}`);
    }
  }
}
