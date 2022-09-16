import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express,{Request,Response,NextFunction} from "express";
import cookieSession from "cookie-session";
import authRoutes from "../api/index";
import { errorHandler, NotFoundError } from "@igcommon/common";

const app = express();

// traffic is being proxied to our app through ngx
// app.set("trust proxy", true);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  cookieSession({
    signed: false,
    // secure:true
    // name:'session',
    // maxAge:24*60*1000*60,
    // keys:['secret key for roration','secret key']
  })
);

app.use(function(req:Request, res:Response, next:NextFunction) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', "true");
  next();
});



app.use(authRoutes);

app.get("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export default app;
