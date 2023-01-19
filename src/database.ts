import * as dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

// prettier-ignore
const { 
    POSTGRES_HOST, 
    POSTGRES_PORT = 5432,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_USER, 
    POSTGRES_PASSWORD,
    ENV,
} = process.env;

console.log("-----------------------------", ENV);

let client: Pool;
if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    port: +POSTGRES_PORT,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export { client };
