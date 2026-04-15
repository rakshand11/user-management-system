import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import { userRouter } from "./route/user.route.js";
import { adminRouter } from "./route/admin.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://user-management-system.rakshand.site",
    credentials: true,
  }),
);

app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (err) {
    console.log(err.message);
  }
};

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
