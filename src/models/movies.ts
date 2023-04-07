import mongoose from "mongoose";

import { uid } from "../helpers";

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String, default: () => uid() },
    message: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  }
);

movieSchema.set("toObject", {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

movieSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

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
