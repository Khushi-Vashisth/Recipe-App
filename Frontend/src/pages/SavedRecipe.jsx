import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { getUserId } from "../getUser";

function savedRecipe() {
  let userID = getUserId();
  const [savedRecipe, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      const ApiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(
          `${ApiUrl}recipe/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log("savedOne", response);
        console.log("saved recipes : ", response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipe();
  }, []);

  return (
    <div className="home">
      <h1>Saved Recipes</h1>
      <ul className="items">
        {savedRecipe.map((i) => (
          <li key={i._id} className="recipeList">
            <div className="titleRecipe">
              <h2>Recipe Name : {i.name}</h2>
            </div>
            <div>
              <p>
                <b>To Be Noted </b>:{i.instructions}
              </p>
            </div>
            <div>
              <p>
                <b>Ingredients</b> : {i.ingredients}
              </p>
            </div>
            <div>
              <img src={i.imageUrl} alt="Recipe" />
            </div>
            <div>
              <h3>Cooking Time : {i.time} (minutes)</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default savedRecipe;
