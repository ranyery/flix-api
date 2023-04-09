import { Router } from "express";

import {
  authenticate,
  create,
  updateToken,
  validateToken,
} from "../controllers/users";
import { authMiddleware } from "../middlewares/authMiddleware";

// https://www.youtube.com/watch?v=b8ZUb_Okxro
export default (router: Router) => {
  router.post("/users/signup", create);
  router.post("/auth/login", authenticate);
  router.post("/auth/refresh-token", authMiddleware, updateToken);
  router.post("/auth/validate-token", authMiddleware, validateToken);
};
