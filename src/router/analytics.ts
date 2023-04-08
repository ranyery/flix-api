import { Router } from "express";

import { addClick, addView } from "../controllers/analytics";

export default (router: Router) => {
  router.put("/analytics/click/:id", addClick);
  router.put("/analytics/view/:id", addView);
};
