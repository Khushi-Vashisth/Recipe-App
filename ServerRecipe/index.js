import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { UserRouter } from "../ServerRecipe/src/routes/users.js";
import { reciperouter } from "./src/routes/recipes.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const port = 8000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`running on port: ${port}`);
    });
  } catch (err) {
    console.error("Could not connect to MongoDB...", err);
    process.exit(0);
  }
};
connectDB();

app.use("/auth", UserRouter);
app.use("/recipes", reciperouter);

app.get("/", (req, res) => {
  res.send("welcome kd");
});
