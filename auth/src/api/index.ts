import express from "express";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const routes = express.Router();

routes.use("/", [currentUserRouter, signinRouter, signoutRouter, signupRouter]);

export default routes;
