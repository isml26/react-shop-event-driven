import express, { Request, Response } from "express";
import { setJwt } from "../../services/jwt";
import { Password } from "../../services/password";
import { User } from "../../models/User";
import { UserValidate } from "../../validators/auth";
import { validateRequest, BadRequestError } from "@igcommon/common";

const router = express.Router();

router.post(
  "/api/users/signin",
  UserValidate.signin,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("User does not exist!!");
    }
    const passwordsMatch = await Password.toCompare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid password!!");
    }

    setJwt(existingUser, req);

    res.send(existingUser);
  }
);

export { router as signinRouter };
