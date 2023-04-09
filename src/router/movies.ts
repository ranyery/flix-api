import { Router } from "express";

import {
  create,
  deleteById,
  getAll,
  getById,
  updateById,
} from "../controllers/movies";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateLimit } from "../middlewares/validateLimit";

export default (router: Router) => {
  router.get("/movies", validateLimit, getAll);
  router.get("/movies/:id", getById);
  router.post("/movies", authMiddleware, create);
  router.put("/movies/:id", authMiddleware, updateById);
  router.delete("/movies/:id", authMiddleware, deleteById);
};
