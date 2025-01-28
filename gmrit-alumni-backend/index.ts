import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./db/db";
import router from "./routes";

const app = express();
const port = process.env.PORT || 3000;

// db.connect();
console.log(await db.ping());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", router);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
