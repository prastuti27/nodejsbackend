import express, { Request, Response } from "express";
import config from "./config";
import routes from "./routes";
const app = express();
app.use(express.json());
app.use(routes);
app.get("/api", (req: Request, res: Response) => {
  res.json({
    message: "hello world",
  });
});
console.log(`Server start on port: ${config.serverPort}`);
app.listen(config.serverPort);
