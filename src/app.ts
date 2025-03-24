import express from "express";
import morgan from "morgan";
import { Utils } from "./utils";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(Utils.errorHandler);

export default app;
