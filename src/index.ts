import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import db from "./config/dbConnect";

db.on("error", (e) => console.error("🔴 Database connection error!\n", e));
db.once("open", () => console.log("🟢 Database connection successful!"));

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(express.json());

app.get("/", (request, response) => {
  response.send({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
