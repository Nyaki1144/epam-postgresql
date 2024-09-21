import express, { Router } from "express";
import {
  getDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
  setDirector,
} from "../controller/directorController";

const directorsRout = Router();
directorsRout.use(express.json());

directorsRout.get("/", getDirectors);
directorsRout.get("/:id", getDirector);
directorsRout.put("/:id", updateDirector);
directorsRout.delete("/:id", deleteDirector);
directorsRout.post("/", setDirector);

export default directorsRout;
