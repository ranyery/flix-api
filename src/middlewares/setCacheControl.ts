import { NextFunction, Request, Response } from "express";

const setCacheControl = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Cache-Control", "s-maxage=21600");
  next();
};

export { setCacheControl };
