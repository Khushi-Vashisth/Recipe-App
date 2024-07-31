import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json);
app.use(cors());

mongoose.connect(
  "mongodb+srv://khushidhiman951:vashisth2006@recipedb.jubpzg2.mongodb.net/RecipeDB?retryWrites=true&w=majority&appName=RecipeDB"
);

app.listen(3000, () => {
  console.log("SERVER STARTED !");
});

// app.get("/", (req, res) => {
//   res.send("welcome");
// });
