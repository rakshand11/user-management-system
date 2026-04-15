import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  adminUpdateUser,
  deleteUser,
  managerUpdateUser,
} from "../controller/admin.controller.js";
import {
  userMiddleware,
  adminMiddleware,
  managerMiddleware,
} from "../middleware/middleware.js";

export const adminRouter = Router();

adminRouter.post("/create", userMiddleware, adminMiddleware, createUser);
adminRouter.put(
  "/update/:id",
  userMiddleware,
  adminMiddleware,
  adminUpdateUser,
);
adminRouter.delete("/delete/:id", userMiddleware, adminMiddleware, deleteUser);
adminRouter.get("/users", userMiddleware, managerMiddleware, getAllUsers);
adminRouter.get("/users/:id", userMiddleware, managerMiddleware, getUserById);
adminRouter.put(
  "/manager/update/:id",
  userMiddleware,
  managerMiddleware,
  managerUpdateUser,
);
