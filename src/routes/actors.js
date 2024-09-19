import express, { Router } from "express";
import { getActors, getActor, updateActor, deleteActor, setActor } from "../controller/actorController.js";

const actorsRout = Router();
actorsRout.use(express.json());

actorsRout.get("/", getActors);
actorsRout.get("/:id", getActor);
actorsRout.put("/:id", updateActor);
actorsRout.delete("/:id", deleteActor);
actorsRout.post("/", setActor);

export default actorsRout;
