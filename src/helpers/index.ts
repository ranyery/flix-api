import isNumeric from "fast-isnumeric";
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

export { uid, isValidId, toNumber };
