import ShortUniqueId from "short-unique-id";

const UID_LENGTH = 6;
const VALID_ID_PATTERN = new RegExp(`^[a-zA-Z0-9]{${UID_LENGTH}}$`);

const uid = new ShortUniqueId({ length: UID_LENGTH });

const isValidId = (id: string): boolean => VALID_ID_PATTERN.test(id);

export { uid, isValidId };
