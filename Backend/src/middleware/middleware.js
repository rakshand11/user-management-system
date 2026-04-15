import dotenv from "dotenv";
import { userModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";
dotenv.config();

export const userMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        msg: "Token not found",
      });
      return;
    }
    const token = authHeader.split(" ")[1];
    const jwtSecret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, jwtSecret);
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).json({
        msg: "User not found",
      });
      return;
    }
    if (user.status === "inactive") {
      res.status(403).json({
        msg: "User is inactive",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Invalid Token",
    });
  }
};

export const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied,Admin only" });
  }
  next();
};

export const managerMiddleware = async (req, res, next) => {
  if (req.user.role !== "manager" && req.user.role !== "admin") {
    return res.status(403).json({
      msg: "Access denied,Manager only",
    });
  }
  next();
};
