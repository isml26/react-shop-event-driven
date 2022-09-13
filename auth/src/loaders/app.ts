import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieSession from "cookie-session";
import authRoutes from "../api/index";
import {errorHandler,NotFoundError} from "@igcommon/common";

const app = express();

// traffic is being proxied to our app through ngx
app.set("trust proxy", true);

app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // secure:true
  })
);

app.use(authRoutes);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
