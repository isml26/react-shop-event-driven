import express from "express"
import { confirmEmail } from "./routes/confirm.email";

const routes = express.Router();

routes.use("/", [confirmEmail]);

export default routes;