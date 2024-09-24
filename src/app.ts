import express from "express";
import "dotenv/config";
import actorsRout from "./routes/actors";
import directorsRout from "./routes/directors";
import moviesRout from "./routes/movies";
import genresRout from "./routes/genres";
import ratingsRout from "./routes/ratings";
import movieGenresRout from "./routes/movieGenres";
import { pool } from "./model/db/connetion";
import { createDirectorsTable, setDirectorService } from "./services/director.service";
import { createActorsTable, setActorService } from "./services/actor.service";
import { createMoviesTable, setMovieService } from "./services/movie.service";
import { createRatingTable, setRatingService } from "./services/rating.service";
import { createGenreTable, setGenreService } from "./services/genre.service";
import { createMovieGenresTable, setMovieGenresService } from "./services/movieGenres.service";
import { director } from "./model/db/director";
import { movies } from "./model/db/movies";
import { genre } from "./model/db/genre";
import { actor } from "./model/db/actor";
import { ratings } from "./model/db/ratings";
import { movieGenre } from "./model/db/movieGenre";

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

  await Promise.all(director.map((el) => setDirectorService(el)));
  await Promise.all(movies.map((el) => setMovieService(el)));
  await Promise.all(genre.map((el) => setGenreService(el)));
  await Promise.all(actor.map((el) => setActorService(el)));
  await Promise.all(ratings.map((el) => setRatingService(el)));
  await Promise.all(movieGenre.map((el) => setMovieGenresService(el)));

  app.listen(process.env.PORT, () => {
    console.log(`server is runing on ${process.env.PORT} PORT`);
  });
}

init();
