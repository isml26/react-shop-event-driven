import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
  confirmed: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      //@ts-ignore
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
    req.currentUser = payload;
    next();
  } catch (err) {
    res.send({ currentUser: null, error: err });
  }
};
