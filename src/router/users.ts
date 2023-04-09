import { Router } from "express";

import { authenticate, updateToken, validateToken } from "../controllers/users";
import { authMiddleware } from "../middlewares/authMiddleware";

export default (router: Router) => {
  // router.post("/users/signup", create);
  router.post("/users/login", authenticate);
  router.post("/users/token/validate", authMiddleware, validateToken);
  router.post("/users/token/refresh", authMiddleware, updateToken);
};
