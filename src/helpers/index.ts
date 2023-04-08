import { Response } from "express";
import isNumeric from "fast-isnumeric";
import { StatusCodes as STATUS_CODES } from "http-status-codes";
import ShortUniqueId from "short-unique-id";

const UID_LENGTH = 6;
const VALID_ID_PATTERN = new RegExp(`^[a-zA-Z0-9]{${UID_LENGTH}}$`);

const uid = new ShortUniqueId({ length: UID_LENGTH });

const isValidId = (id: string): boolean => VALID_ID_PATTERN.test(id);

const toNumber = (value: any, defaultValue = 0) => {
  if (!value || !isNumeric(value)) {
    return defaultValue;
  }

  return Number(value);
};

const handleErrorId = (res: Response, message = "Id is required.") => {
  return res.status(STATUS_CODES.BAD_REQUEST).send({ message });
};

const handleServerError = (res: Response, error: unknown) => {
  console.error(error);
  res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).send();
};

export { uid, isValidId, toNumber, handleErrorId, handleServerError };
