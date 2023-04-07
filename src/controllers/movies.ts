import { Request, Response } from "express";
import { isValidId } from "helpers";
import { StatusCodes as STATUS_CODES } from "http-status-codes";
import Joi from "joi";

import {
  createMovie,
  deleteMovieById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../models/movies";

// TODO: Adicionar paginação
export const getAll = async (req: Request, res: Response) => {
  try {
    const movies = await getAllMovies();

    return res.send(movies); // StatusCode 200 is set by default
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"]?.trim();

    if (!id || !isValidId(id)) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Id is required." });
    }

    const movie = await getMovieById(id);

    if (!movie) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Movie not found." });
    }

    return res.send(movie);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
  }
};

export const create = async (req: Request, res: Response) => {
  const schema = Joi.object({
    message: Joi.string().required(),
  });

  try {
    const { value, error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorDetails = error.details.map((detail) =>
        detail.message.replace(/\"/g, "'")
      );
      return res
        .status(STATUS_CODES.UNPROCESSABLE_ENTITY)
        .send({ message: "Validation error", details: errorDetails });
    }

    const movie = await createMovie(value);

    return res.send(movie);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
  }
};

export const updateById = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"]?.trim();

    if (!id || !isValidId(id)) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Id is required." });
    }

    const values = req.body;

    // Validar se o objeto está vazio ou se tem propriedades não necessárias
    // Utilizar Joi
    if (!values) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Values are required." });
    }

    const updatedMovie = await updateMovieById(id, values);

    if (!updatedMovie) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Movie not found." });
    }

    return res.send(updatedMovie);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
  }
};

export const deleteById = async (req: Request, res: Response) => {
  try {
    const id = req.params["id"]?.trim();

    if (!id || !isValidId(id)) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .send({ message: "Id is required." });
    }

    const deletedMovie = await deleteMovieById(id);

    if (!deletedMovie) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Movie not found." });
    }

    return res.send({ message: "Movie successfully deleted." });
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
  }
};
