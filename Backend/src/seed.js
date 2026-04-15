import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { userModel } from "./model/user.model.js";
dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await userModel.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    await userModel.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      status: "active",
    });

    console.log("Admin created successfully");
    console.log("Email: admin@gmail.com");
    console.log("Password: admin123");
    process.exit(0);
  } catch (error) {
    console.log("Seeding failed", error.message);
    process.exit(1);
  }
};

seedAdmin();
