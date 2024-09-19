import pg from "pg";
const { Pool } = pg;
import "dotenv/config";
import { postgresConfig } from "../../config/connectionConfig.js";

const pool = new Pool(postgresConfig);

// pool.on("connect", () => {
//   console.log("Connected to the database");
// });

// await client.query(Directors);
// await client.query(Actors);
// await client.query(Genres);
// await client.query(Movies);
// await client.query(Ratings);
// await client.query(MovieGenres);

// client.release();

// pool.on("error", (err) => {
//   console.error("Unexpected error on idle client", err);
// });

export { pool };
