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

const handleErrorId = (res: Response, message = "Id is required.") => {
  return res.status(STATUS_CODES.BAD_REQUEST).send({ message });
};

const handleServerError = (res: Response, error: unknown) => {
  console.error(error);
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
};

export const getAll = async (req: Request, res: Response) => {
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
    "imdbRating",
    "releaseDate",
    "image.poster",
    "video.formats",
    "video.quality",
  ];

  try {
    const [totalCount, movies] = await Promise.all([
      MovieModel.countDocuments({ isActive: false }),
      MovieModel.find({ isActive: false }, requiredProps.join(" "))
        .lean()
        .sort({ createdAt: sort })
        .skip((page - 1) * limit)
        .limit(limit),
    ]);

    const filteredMovies = movies.map((movie) => {
      if (movie["imdbRating"] === "") {
        delete movie["imdbRating"];
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
    handleServerError(res, error);
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = req.params["id"]?.trim();
  if (!id || !isValidId(id)) return handleErrorId(res);

  try {
    const movie = await getMovieById(id);

    if (!movie) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Movie not found." });
    }

    return res.send(movie);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    imdbId: Joi.string(),
    imdbRating: Joi.string(),
    tmdbId: Joi.number(),
    releaseDate: Joi.string(),
    youtubeId: Joi.string(),
    size: Joi.string(),
    languages: Joi.array<string>().items(Joi.string()),
    magnets: Joi.array().items(
      Joi.object({ title: Joi.string(), link: Joi.string() })
    ),
    image: Joi.object({ poster: Joi.string(), background: Joi.string() }),
    video: Joi.object({
      formats: Joi.array<string>().items(Joi.string()),
      quality: Joi.array<string>().items(Joi.string()),
    }),
  });

  const { value, error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map(
      (detail) => `Property ${detail.message.replace(/\"/g, "'")}`
    );
    return res
      .status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .send({ message: "Validation error", details: errorDetails });
  }

  try {
    const movie = await createMovie(value);

    return res.send(movie);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const updateById = async (req: Request, res: Response) => {
  const id = req.params["id"]?.trim();
  if (!id || !isValidId(id)) return handleErrorId(res);

  const schema = Joi.object({
    title: Joi.string(),
    imdbId: Joi.string(),
    imdbRating: Joi.string(),
    tmdbId: Joi.number(),
    releaseDate: Joi.string(),
    youtubeId: Joi.string(),
    size: Joi.string(),
    languages: Joi.array<string>().items(Joi.string()),
    magnets: Joi.array().items(
      Joi.object({ title: Joi.string(), link: Joi.string() })
    ),
    image: Joi.object({ poster: Joi.string(), background: Joi.string() }),
    video: Joi.object({
      formats: Joi.array<string>().items(Joi.string()),
      quality: Joi.array<string>().items(Joi.string()),
    }),
  });

  const { value, error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map(
      (detail) => `Property ${detail.message.replace(/\"/g, "'")}`
    );
    return res
      .status(STATUS_CODES.UNPROCESSABLE_ENTITY)
      .send({ message: "Validation error", details: errorDetails });
  }

  try {
    const updatedMovie = await updateMovieById(id, value);

    if (!updatedMovie) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Movie not found." });
    }

    return res.send(updatedMovie);
  } catch (error) {
    handleServerError(res, error);
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const id = req.params["id"]?.trim();
  if (!id || !isValidId(id)) return handleErrorId(res);

  try {
    const deletedMovie = await deleteMovieById(id);

    if (!deletedMovie) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .send({ message: "Movie not found." });
    }

    return res.send({ message: "Movie successfully deleted." });
  } catch (error) {
    handleServerError(res, error);
  }
};
