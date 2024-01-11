import express, { Request, Response } from "express";
import config from "./config";
import cors from "cors";
import routes from "./routes";
import { genericErrorHandler } from "./middleware/errorHandler";
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(genericErrorHandler);
app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "hello world",
  });
});
console.log(`Server start on port: ${config.serverPort}`);
app.listen(config.serverPort);
