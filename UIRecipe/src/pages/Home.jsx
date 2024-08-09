import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { getUserId } from "../getUser";

function Home() {
  let userID = getUserId();
  const [recipe, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    let userID = getUserId();

    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipe");
        setRecipes(response.data);
        // console.log(response);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipe/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log("saved recipes : ", response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const Handlesave = async (recipeID) => {
    let userID = getUserId();

    try {
      const response = await axios.put("http://localhost:8000/recipe", {
        userID,
        recipeID,
      });
      const updatedSavedRecipes = response.data.savedRecipes;
      setSavedRecipes(updatedSavedRecipes);
      console.log("save or unsave", response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <h1>Recipes</h1>
      <ul>
        {recipe.map((i) => (
          <li key={i._id} className="recipeList">
            <div className="titleRecipe">
              <h2>Recipe Name : {i.name}</h2>
              <span onClick={() => Handlesave(i._id)}>
                {Array.isArray(savedRecipes) && savedRecipes.includes(i._id) ? (
                  <i class="fa-solid fa-bookmark"></i>
                ) : (
                  <i class="fa-regular fa-bookmark"></i>
                )}
              </span>
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

export default Home;
