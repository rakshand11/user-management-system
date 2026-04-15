import { Router } from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controller/user.controller.js";
import { userMiddleware } from "../middleware/middleware.js";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", userMiddleware, updateUser);
userRouter.get("/get-profile", userMiddleware, getUser);
userRouter.post("/logout", userMiddleware, logoutUser);
