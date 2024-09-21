import express, { Router } from "express";
import {
  getRatings,
  getRating,
  updateRating,
  deleteRating,
  setRating,
} from "../controller/ratindController";

const genresRout = Router();
genresRout.use(express.json());

genresRout.get("/", getRatings);
genresRout.get("/:id", getRating);
genresRout.put("/:id", updateRating);
genresRout.delete("/:id", deleteRating);
genresRout.post("/", setRating);

export default genresRout;
