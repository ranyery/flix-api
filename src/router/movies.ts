import { Router } from "express";

import {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/movies";

export default (router: Router) => {
  router.get("/movies", getAll);
  router.get("/movies/:id", getById);
  router.post("/movies", create);
  router.put("/movies/:id", updateById);
  router.delete("/movies/:id", deleteById);
};
