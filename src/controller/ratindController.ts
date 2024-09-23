import { deleteActorService } from "../services/actor.service";
import {
  getRatingService,
  getRatingsService,
  setRatingService,
  updateRatingService,
} from "../services/rating.service";
import { Controller } from "../util/typs";

export const getRatings: Controller = async (req, res) => {
  try {
    const data = await getRatingsService();
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const getRating: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await getRatingService(ID);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateRating: Controller = async (req, res) => {
  try {
    const movieid = req.params.id;
    const data = req.body;
    const result = await updateRatingService(movieid, data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteRating: Controller = async (req, res) => {
  try {
    const ID = req.params.id;
    const data = await deleteActorService(ID);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

export const setRating: Controller = async (req, res) => {
  try {
    const data = req.body;
    const result = await setRatingService(data);
    res.status(201).json(result);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};
