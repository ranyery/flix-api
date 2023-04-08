import { NextFunction, Request, Response } from "express";
import isNumeric from "fast-isnumeric";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

const validateLimit = (req: Request, res: Response, next: NextFunction) => {
  const limit = req.query.limit;

  if (!limit) return next();

  if (typeof limit === "string" && isNumeric(limit)) {
    const limitValue = parseInt(limit);
    if (limitValue >= 0 && limitValue <= 100) {
      return next();
    }
  }

  return res
    .status(STATUS_CODES.BAD_REQUEST)
    .send({ error: "Invalid limit value" });
};

export { validateLimit };
