import pg from "pg";
const { Pool } = pg;
import { postgresConfig } from "../../config/connectionConfig";

const pool = new Pool(postgresConfig);

export { pool };
