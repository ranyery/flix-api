import { Router } from "express";

import { addMovie, getAllMovies } from "../controllers/movies";

export default (router: Router) => {
  router.get("/movies", getAllMovies);
  router.post("/movies", addMovie);
};
