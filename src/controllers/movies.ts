import { Request, Response } from "express";

import { createMovie, getMovies } from "../models/movies";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getMovies();

    return res.status(200).send(movies);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export const addMovie = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const movie = await createMovie({ message });

    return res.status(200).send(movie);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
