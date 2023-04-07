import { Request, Response } from "express";

import { getMovies } from "../models/movies";

export const getAllMovies = async (req: Request, res: Response) => {
  try {
    const movies = await getMovies();

    return res.status(200).send(movies);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
