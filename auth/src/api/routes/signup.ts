import express, { Request, Response } from "express";
import { setJwt } from "../../services/jwt";
import { User } from "../../models/User";
import { UserValidate } from "../../validators/auth";
import { BadRequestError, validateRequest } from "@igcommon/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  UserValidate.signup,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError("Email In Use");
    }

    const user = User.build({ email, password });
    await user.save();

    setJwt(user, req);

    res.status(201).send(user);
  }
);

export { router as signupRouter };
