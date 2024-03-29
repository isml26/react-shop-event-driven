import express from "express";
// import { currentUser } from "@igcommon/common";
import {currentUser} from "../../../../common/src/middlewares/current-user";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser|| null });
});

export { router as currentUserRouter };
