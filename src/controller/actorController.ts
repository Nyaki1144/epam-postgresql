import {
  deleteActorService,
  getActorService,
  getActorsService,
  setActorService,
  updateActorService,
} from "../services/actor.service";
import { Controller } from "../util/typs";

export const getActors: Controller = async (req, res) => {
  try {
    const data = getActorsService();
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getActor: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await getActorService(ID);
    res.status(201).json({ message: data });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateActor: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const result = await updateActorService(ID, data);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteActor: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await deleteActorService(ID);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setActor: Controller = async (req, res) => {
  try {
    const data = req.body;
    const result = await setActorService(data);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
