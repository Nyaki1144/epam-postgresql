import express from "express";
import "dotenv/config";
import actorsRout from "./routes/actors";
import directorsRout from "./routes/directors";
import moviesRout from "./routes/movies";
import genresRout from "./routes/genres";
import ratingsRout from "./routes/ratings";
import movieGenresRout from "./routes/movieGenres";
import { pool } from "./model/db/connetion";
import { createDirectorsTable } from "./services/director.service";
import { createActorsTable } from "./services/actor.service";
import { createMoviesTable } from "./services/movie.service";
import { createRatingTable } from "./services/rating.service";
import { createGenreTable } from "./services/genre.service";
import { createMovieGenresTable } from "./services/movieGenres.service";

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

  await createDirectorsTable();
  await createActorsTable();
  await createGenreTable();
  await createMoviesTable();
  await createRatingTable();
  await createMovieGenresTable();

  app.listen(process.env.PORT, () => {
    console.log(`server is runing on ${process.env.PORT} PORT`);
  });
}

init();
