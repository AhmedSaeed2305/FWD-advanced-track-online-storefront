import bcrypt from "bcrypt";
import { client } from "../database";

//prettier-ignore
const { 
    BYCRPT_PASSWORD,
    SALT_ROUNDS = 10,
} = process.env;

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
};

export class UserStore {
  saltRounds = SALT_ROUNDS;
  pepper = BYCRPT_PASSWORD;

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM user_table";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Couldn't get users, error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = `SELECT * FROM user_table WHERE id=($1)`;
      const result = await conn.query(sql);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find requested user, error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO user_table(first_name, last_name, password) VALUES ($1, $2) RETURNING *";
      const hashPassword = bcrypt.hashSync(
        u.password + this.pepper,
        this.saltRounds
      );

      const result = await conn.query(sql, [u.firstName, hashPassword]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`unable to create new user (${u.firstName}): ${err}`);
    }
  }

  async authenticate(firstName: string, password: string) {
    const conn = await client.connect();
    const sql = "SELECT password FROM user_table WHERE first_name=($1)";

    const result = await conn.query(sql, [firstName]);

    if (result.rows.length) {
      const user = result.rows[0];

      console.log(user);

      if (bcrypt.compareSync(password + this.pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
