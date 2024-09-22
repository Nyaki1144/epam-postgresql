import express, { Router } from "express";
import {
  deleteMovieGenres,
  setMovieGenres,
} from "../controller/movieGenresController";

const movieGenresRout = Router();
movieGenresRout.use(express.json());

movieGenresRout.delete("/:id", deleteMovieGenres);
movieGenresRout.post("/", setMovieGenres);

export default movieGenresRout;
