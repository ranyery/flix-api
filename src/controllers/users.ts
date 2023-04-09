import { Request, Response } from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";
import { sign } from "jsonwebtoken";

import jwtConfig from "../config/jwtConfig";
import User from "../models/User";

export const create = async (req: Request, res: Response) => {
  return res.status(STATUS_CODES.FORBIDDEN).send();

  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = sign({ email }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // @ts-ignore
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = sign({ email }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const validateToken = (req: Request, res: Response) => {
  // Token está sendo validado via middleware
  res.json({ message: "Access granted" });
};

export const updateToken = async (req: Request, res: Response) => {
  // Token está sendo validado via middleware
  const { email } = req?.["user" as keyof typeof req];

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    const newToken = sign({ email }, jwtConfig.secretKey, {
      expiresIn: jwtConfig.expiresIn,
    });

    res.json({ token: newToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
