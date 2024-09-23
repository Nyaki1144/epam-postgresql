import {
  deleteDirectorService,
  getDirectorService,
  getDirectorsService,
  setDirectorService,
  updateDirectorService,
} from "../services/director.service";
import { Controller } from "../util/typs";

export const getDirectors: Controller = async (req, res) => {
  try {
    const data = await getDirectorsService();
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getDirector: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = getDirectorService(ID);
    res.status(201).send(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateDirector: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const result = await updateDirectorService(ID, data);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteDirector: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const result = await deleteDirectorService(ID);

    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setDirector: Controller = async (req, res) => {
  try {
    const data = req.body;
    const result = await setDirectorService(data);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
