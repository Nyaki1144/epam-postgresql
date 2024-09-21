import express, { Router } from "express";
import {
  getMovieGenres,
  deleteMovieGenres,
  setMovieGenres,
} from "../controller/movieGenresController";

const movieGenresRout = Router();
movieGenresRout.use(express.json());

movieGenresRout.get("/:id", getMovieGenres);
movieGenresRout.delete("/:id", deleteMovieGenres);
movieGenresRout.post("/", setMovieGenres);

export default movieGenresRout;
