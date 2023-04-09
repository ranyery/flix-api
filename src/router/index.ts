import express, { Router } from "express";

import analytics from "./analytics";
import movies from "./movies";
import users from "./users";

const router = express.Router();

export default (): Router => {
  analytics(router);
  movies(router);
  users(router);

  return router;
};
