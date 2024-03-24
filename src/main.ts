import express, { Request, Response } from "express";
import "dotenv/config";
import router from "./routers";
import cors from "cors";

const app: express.Application = express();

// TODO : Settings
app.use(express.json());
app.use("api/v1", router);
app.use(cors());

const PORT: string | number = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
