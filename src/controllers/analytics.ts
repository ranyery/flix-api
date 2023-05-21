import { Request, Response } from "express";
import { StatusCodes as STATUS_CODES } from "http-status-codes";

import { handleErrorId, handleServerError, isValidId } from "../helpers";
import { saveDeviceUserInfo } from "../models/DeviceUserInfo";
import { updateClicks, updateViews } from "../models/Movie";
import { createSearch } from "../models/Search";

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

export const saveSearch = async (req: Request, res: Response) => {
  const term = req.params["term"]?.trim();

  try {
    const createdSearch = await createSearch({ term });

    if (!createdSearch) return res.status(STATUS_CODES.BAD_REQUEST).send();

    return res.send({ message: "ok" });
  } catch (error) {
    handleServerError(res, error);
  }
};

export const saveUserInfo = async (req: Request, res: Response) => {
  const info = req.body;

  try {
    const savedDeviceInfo = await saveDeviceUserInfo(info);

    if (!savedDeviceInfo) return res.status(STATUS_CODES.BAD_REQUEST).send();

    return res.send({ message: "ok" });
  } catch (error) {
    handleServerError(res, error);
  }
};
