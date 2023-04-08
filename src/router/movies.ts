import { Router } from "express";

import {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/movies";
import { validateLimit } from "../middlewares/validateLimit";

export default (router: Router) => {
  router.get("/movies", validateLimit, getAll);
  router.get("/movies/:id", getById);
  router.post("/movies", create);
  router.put("/movies/:id", updateById);
  router.delete("/movies/:id", deleteById);
};
