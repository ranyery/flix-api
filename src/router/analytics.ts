import { Router } from "express";

import { addClick, addView, saveSearch } from "../controllers/analytics";

export default (router: Router) => {
  router.put("/analytics/click/:id", addClick);
  router.put("/analytics/view/:id", addView);
  router.get("/analytics/search/:term", saveSearch);
};
