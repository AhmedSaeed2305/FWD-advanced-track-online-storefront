import bcrypt from "bcrypt";
import dotenv from "dotenv";
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
  async create(u: User): Promise<User> {
    try {
      //@ts-ignore
      const conn = await client.connect();
      const sql =
        "INSERT INTO user_table(first_name, last_name, password) VALUES ($1, $2) RETURNING *";
      const hash = bcrypt.hashSync(u.password + this.pepper, this.saltRounds);

      const result = await conn.query(sql, [u.firstName, hash]);
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
