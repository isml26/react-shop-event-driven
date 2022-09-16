import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express,{Request,Response} from "express";
import emailRoutes from "../api/index";
import { NotFoundError,errorHandler } from "@igcommon/common";

const app = express();
app.set("trustproxy", true);
app.use(express.json());
app.use(cors());
app.use(emailRoutes)

app.all("*", async () => {
  throw new NotFoundError();
});

app.get("/", (req:Request, res:Response) => {
  res.send("Email service");
});



app.use(errorHandler);

export {app};