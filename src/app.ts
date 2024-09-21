import express from "express";
import "dotenv/config";
import actorsRout from "./routes/actors";
import directorsRout from "./routes/directors";
import moviesRout from "./routes/movies";
import genresRout from "./routes/genres";
import ratingsRout from "./routes/ratings";
import movieGenresRout from "./routes/movieGenres";
import { pool } from "./model/db/connetion";
import {
  Actors,
  Directors,
  Genres,
  MovieGenres,
  Movies,
  Ratings,
} from "./model/db/tableScripts";

const app = express();

app.use("/actors", actorsRout);
app.use("/directors", directorsRout);
app.use("/movies", moviesRout);
app.use("/genres", genresRout);
app.use("/ratings", ratingsRout);
app.use("/movieGenres", movieGenresRout);

async function init() {
  await pool.connect();

  pool.on("connect", () => {
    console.log("Connected to the database");
  });

  await pool.query(Directors);
  await pool.query(Actors);
  await pool.query(Genres);
  await pool.query(Movies);
  await pool.query(Ratings);
  await pool.query(MovieGenres);

  app.listen(process.env.PORT, () => {
    console.log(`server is runing on ${process.env.PORT} PORT`);
  });
}

init();
