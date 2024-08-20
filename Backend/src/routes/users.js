import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    //already exist user
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json(`Already Exist USER !!!!!!`);
    }

    //password hashed
    const hashedPassword = await bcrypt.hash(password, 10);

    //new user
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    return res.status(201).json(`REGISTERED SUCCESSFULLY !${newUser}`);
  } catch (err) {
    console.error(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) return res.status(400).json(`USER NOT FOUND :)`);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = jwt.sign({ id: user._id }, "secret");
    return res.json({
      token,
      userID: user._id,
      message: `LOGIN SUCCESSFULLY! ${user}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
});

export { router as UserRouter };
