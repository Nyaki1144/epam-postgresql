import express, { Router } from "express";
import {
  getGenres,
  getGenre,
  updateGenre,
  deleteGenre,
  setGenre,
} from "../controller/genreController";

const genresRout = Router();
genresRout.use(express.json());

genresRout.get("/", getGenres);
genresRout.get("/:id", getGenre);
genresRout.put("/:id", updateGenre);
genresRout.delete("/:id", deleteGenre);
genresRout.post("/", setGenre);

export default genresRout;
