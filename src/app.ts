import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";
const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
