import express from "express";
import "dotenv/config";
import actorsRout from "./routes/actors.js";
import { pool } from "./model/db/connetion.js";

const app = express();

app.use("/actors", actorsRout);

await pool.connect();
pool.on("connect", () => {
  console.log("Connected to the database");
});

app.listen(process.env.PORT, () => {
  console.log(`server is runing on ${process.env.PORT} PORT`);
});
