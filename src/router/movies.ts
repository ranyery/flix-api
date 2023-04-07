import { Router } from "express";

import { getAllMovies } from "../controllers/movies";

export default (router: Router) => {
  router.get("/movies", getAllMovies);
};
