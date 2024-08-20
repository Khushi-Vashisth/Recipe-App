import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/recipes.js";
import { UserModel } from "../models/users.js";

const router = express.Router();

//get all recipes
router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    return res.json(response);
  } catch (err) {
    res.json(err);
  }
});

//new recipe
router.post("/", async (req, res) => {
  const newRecipe = new RecipeModel(req.body);
  try {
    await newRecipe.save();
    return res.json(newRecipe);
  } catch (err) {
    res.json(err);
  }
});

//save the recipe

router.put("/", async (req, res) => {
  try {
    const { userID, recipeID } = req.body;
    const recipe = await RecipeModel.findById(recipeID);
    const user = await UserModel.findById(userID);

    if (user.savedRecipes.includes(recipe._id)) {
      user.savedRecipes.pull(recipe._id);
    } else {
      user.savedRecipes.push(recipe._id);
    }

    await user.save();
    return res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(401).json(err);
  }
});

//get saved Recipe ids
router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    return res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    return res.json(err);
  }
});

//get saved recipes
router.get("/savedrecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    return res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as reciperouter };
