import express, { Router } from "express";

import analytics from "./analytics";
import auth from "./auth";
import movies from "./movies";

const router = express.Router();

export default (): Router => {
  analytics(router);
  movies(router);
  auth(router);

  return router;
};
