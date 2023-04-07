import mongoose from "mongoose";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({ length: 10 });

const movieSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uid },
    message: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// Model
export const MovieModel = mongoose.model("Movie", movieSchema);

// Functions
export const getMovies = () => MovieModel.find();
export const getMovieById = (id: string) => MovieModel.findById(id);
export const createMovie = (values: Record<string, any>) =>
  new MovieModel(values).save().then((movie) => movie.toObject());
