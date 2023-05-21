import { Router } from "express";

import {
  addClick,
  addView,
  saveSearch,
  saveUserInfo,
} from "../controllers/analytics";

export default (router: Router) => {
  router.post("/analytics/user-info", saveUserInfo);
  router.put("/analytics/click/:id", addClick);
  router.put("/analytics/view/:id", addView);
  router.get("/analytics/search/:term", saveSearch);
};
