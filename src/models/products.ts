import { client } from "../database";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM products_table";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get products, error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM products_table WHERE id=${id}`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't get requested product, error: ${err}`);
    }
  }

  async create(
    name: string,
    price: string,
    category: string
  ): Promise<Product> {
    try {
      const conn = await client.connect();
      const sql = `INSERT INTO products_table(name, price, category) VALUES (${name}, ${price}, ${category}) RETURNING *`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't create product: ${name}, error: ${err}`);
    }
  }
}
