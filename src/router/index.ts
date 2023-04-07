import express, { Router } from "express";

import movies from "./movies";

const router = express.Router();

export default (): Router => {
  movies(router);

  return router;
};
