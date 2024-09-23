import {
  deleteMovieGenresService,
  setMovieGenresService,
} from "../services/movieGenres.service";
import { Controller } from "../util/typs";

export const deleteMovieGenres: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const result = deleteMovieGenresService(ID);
    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setMovieGenres: Controller = async (req, res) => {
  try {
    const data = req.body;
    const result = await setMovieGenresService(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
