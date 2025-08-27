import compression from "compression";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
const app = express();

app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(errorMiddleware.errorHandler);

export default app;
