import { Request, Response } from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

import { handleErrorId, handleServerError, isValidId } from "../helpers";
import { updateClicks, updateViews } from "../models/Movie";

export const addClick = async (req: Request, res: Response) => {
  const id = req.params["id"]?.trim();
  if (!id || !isValidId(id)) return handleErrorId(res);

  try {
    const updatedMovie = await updateClicks(id);

    if (!updatedMovie) return res.status(STATUS_CODES.BAD_REQUEST).send();

    return res.send();
  } catch (error) {
    handleServerError(res, error);
  }
};

export const addView = async (req: Request, res: Response) => {
  const id = req.params["id"]?.trim();
  if (!id || !isValidId(id)) return handleErrorId(res);

  try {
    const updatedMovie = await updateViews(id);

    if (!updatedMovie) return res.status(STATUS_CODES.BAD_REQUEST).send();

    return res.send();
  } catch (error) {
    handleServerError(res, error);
  }
};
