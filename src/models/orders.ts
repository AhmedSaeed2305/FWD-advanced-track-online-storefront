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
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM orders_table;`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get requested order, error: ${err}`);
    }
  }
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
