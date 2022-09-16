import express, { Request, Response } from "express";
import { setJwt } from "../../services/jwt";
import { User } from "../../models/User";
import { UserValidate } from "../../validators/auth";
import { BadRequestError, validateRequest } from "@igcommon/common";
import { UserCreatedPublisher } from "../../events/publisher/email-confirmed-publisher";

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
    try {
      await user.save();
      const user_id = user._id;
      new UserCreatedPublisher(global.producer).publish({email,user_id})
      setJwt(user, req);
    } catch (error) {
      console.log(error)
    }


    res.status(201).send(user);
  }
);

export { router as signupRouter };
