import { client } from "../database";

export type Order = {
  id: number;
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
      const sql = `SELECT * FROM orders_table WHERE user_id=${userId} ORDER BY id DESC LIMIT 1;`;
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
      const sql = `INSERT INTO orders_table (quantity, status, product_id, user_id) VALUES (${order.quantity}, ${order.status}, ${order.productId},${order.userId}) RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create new order, error: ${err}`);
    }
  }
}
