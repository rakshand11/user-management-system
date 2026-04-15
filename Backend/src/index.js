import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const connectToDatabase = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(mongoURI);
    console.log("server is successfully connected to database");
  } catch (error) {
    console.log("server is not connected to database", error.message);
  }
};
connectToDatabase();
app.use(express.json());
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
