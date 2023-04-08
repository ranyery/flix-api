import { Request, Response } from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";
import Joi from "joi";
import { SortOrder } from "mongoose";

import { isValidId, toNumber } from "../helpers";
import {
  createMovie,
  deleteMovieById,
  getMovieById,
  MovieModel,
  updateMovieById,
} from "../models/movies";

export const getAll = async (req: Request, res: Response) => {
  try {
    const sortMap: { [k: string]: SortOrder } = {
      1: 1,
      asc: 1,
      ascending: 1,
      "-1": -1,
      desc: -1,
      descending: -1,
    };

    const page = toNumber(req.query.page, 1);
    const limit = toNumber(req.query.limit, 20);
    const sort = sortMap[req.query.sort as keyof typeof sortMap] || -1;

    const requiredProps = [
      "title",
      "image",
      "likes",
      "oldPrice",
      "price",
      "isFreeShipping",
      "createdAt",
    ];

    const [totalCount, movies] = await Promise.all([
      MovieModel.countDocuments({ isActive: true }),
      MovieModel.find({ isActive: true }, requiredProps.join(" "))
        .lean()
        .sort({ createdAt: sort })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    const filteredMovies = movies.map((movie) => {
      if (movie["message"] === "") {
        delete movie["message" as keyof typeof movie];
      }

      if (!movie["message"]) {
        delete movie["message" as keyof typeof movie];
      }

      return movie;
    });

    const response = {
      currentPage: page,
      totalCount: totalCount,
      hasMore: totalCount > page * limit,
      movies: filteredMovies,
    };

    return res.send(response); // StatusCode 200 is set by default
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
      const errorDetails = error.details.map(
        (detail) => `Property ${detail.message.replace(/\"/g, "'")}`
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
