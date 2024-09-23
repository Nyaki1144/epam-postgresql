import {
  deleteGenreService,
  getGenresService,
  getGenreService,
  updateGenreService,
  setGenreService,
} from "../services/genre.service";

import { Controller } from "../util/typs";

export const getGenres: Controller = async (req, res) => {
  try {
    const data = await getGenresService();
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getGenre: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await getGenreService(ID);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateGenre: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const result = updateGenreService(ID, data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteGenre: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = deleteGenreService(ID);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setGenre: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const result = setGenreService(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
