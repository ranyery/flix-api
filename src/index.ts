import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import useragent from "express-useragent";

import db from "./config/dbConnect";
import { setCacheControl } from "./middlewares/setCacheControl";
import router from "./router";

// TODO: Refactor => Colocar em um lugar mais apropriado
import { saveRequestDetails } from "./models/Requests";

db.on("error", (e) => console.error("🔴 Database connection error!\n", e));
db.once("open", () => console.log("🟢 Database connection successful!"));

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(compression());
app.use(useragent.express());
app.use(express.json());

app.disable("x-powered-by");

app.use(setCacheControl);

app.set("trust proxy", true);
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    await saveRequestDetails({
      ip: req.ip,
      method: req.method,
      requestUrl: req.originalUrl,
      statusCode: res.statusCode,
      browser: req.useragent?.browser,
      version: req.useragent?.version,
      os: req.useragent?.os,
      platform: req.useragent?.platform,
      IsMobile: req.useragent?.isMobile,
      timeToResponse: `${duration}ms`,
    });
  });

  next();
});

app.get("/", (request, response) => {
  response.send({ message: "Hello, World!" });
});

app.use("/api/v1", router());

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
