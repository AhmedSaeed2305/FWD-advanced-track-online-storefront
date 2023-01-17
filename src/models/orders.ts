import { client } from "../database";

export type Order = {
  id: number;
  quantity: number;
  status: boolean;
  productId: number;
  userId: number;
};

export class OrderStore {
  async show(userId: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products_table WHERE product_id= (SELECT product_id FROM orders_table WHERE user_id =${userId});`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't get requested order, error: ${err}`);
    }
  }
}
