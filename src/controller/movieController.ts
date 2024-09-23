import { pool } from "../model/db/connetion";
import {
  deleteMovieService,
  getMovieService,
  getMoviesService,
  setMovieService,
  updateMovieService,
} from "../services/movie.service";
import { Controller } from "../util/typs";

export const getMovies: Controller = async (req, res) => {
  try {
    const data = getMoviesService();
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getMovie: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await getMovieService(ID);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateMovie: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = req.body;
    const result = updateMovieService(data, ID);

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteMovie: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const result = await deleteMovieService(ID);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setMovie: Controller = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    const result = await setMovieService(data);
    res.status(201).send(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
