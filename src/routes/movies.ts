import express, { Router } from "express";
import {
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  setMovie,
} from "../controller/movieController";

const moviesRout = Router();
moviesRout.use(express.json());

moviesRout.get("/", getMovies);
moviesRout.get("/:id", getMovie);
moviesRout.put("/:id", updateMovie);
moviesRout.delete("/:id", deleteMovie);
moviesRout.post("/", setMovie);

export default moviesRout;
