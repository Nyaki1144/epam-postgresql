import { postgresConfigType } from "../util/typs";
import "dotenv/config";

export const postgresConfig: postgresConfigType = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
};
