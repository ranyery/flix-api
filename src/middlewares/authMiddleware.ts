import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import jwtConfig from "../config/jwtConfig";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.query.token) {
    token = req.query.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  try {
    const decoded = verify(token!, jwtConfig.secretKey);
    // @ts-ignore
    req["user"] = decoded;

    next();
  } catch (err) {
    // @ts-ignore
    if (err?.["name"] === "TokenExpiredError") {
      return res.status(401).json({ message: "Authorization token expired" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export { authMiddleware };
