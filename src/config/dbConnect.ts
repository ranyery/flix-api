import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const username = process.env.USERNAMEMONGO!;
const password = process.env.PASSWORDMONGO!;

const MONGODB_URL = `mongodb+srv://${username}:${password}@descontoverso.u2bta8a.mongodb.net/descontoverso`;

mongoose.Promise = Promise;
mongoose.set("strictQuery", false);

mongoose.connect(MONGODB_URL);

const db = mongoose.connection;

export default db;
