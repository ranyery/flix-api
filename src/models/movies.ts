import mongoose from "mongoose";

import { uid } from "../helpers";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uid() },
    title: { type: String, required: true },
    imdbId: { type: String, required: false },
    imdbRating: { type: String, required: false },
    tmdbId: { type: Number, required: false },
    releaseDate: { type: String, required: false },
    isActive: { type: Boolean, required: false, default: false },
    isHighlight: { type: Boolean, required: false, default: false },
    clicks: { type: Number, required: false, default: 0 },
    views: { type: Number, required: false, default: 0 },
    youtubeId: { type: String, required: false },
    size: { type: String, required: false },
    languages: { type: [String], required: false },
    magnets: {
      type: [
        {
          title: { type: String, required: false },
          link: { type: String, required: false },
          _id: false,
        },
      ],
      required: false,
    },
    image: {
      poster: { type: String, required: false },
      background: { type: String, required: false },
    },
    video: {
      formats: { type: [String], required: false },
      quality: { type: [String], required: false },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

// Model
export const MovieModel = mongoose.model("Movie", movieSchema);

// Functions
export const getAllMovies = () => MovieModel.find();
export const getMovieById = (id: string) => MovieModel.findById(id);

export const createMovie = async (values: Record<string, any>) => {
  const movie = new MovieModel(values);

  try {
    return await movie.save();
  } catch (err: any) {
    if (err.code === 11000 || err.code === 11001) {
      movie._id = uid();
      return await movie.save();
    }
    throw err;
  }
};

export const deleteMovieById = (id: string) =>
  MovieModel.findOneAndDelete({ _id: id });

export const updateMovieById = (id: string, value: Record<string, any>) =>
  MovieModel.findByIdAndUpdate(id, value, { new: true });
