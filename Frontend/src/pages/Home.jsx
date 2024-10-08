import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { getUserId } from "../getUser";

function Home() {
  const [recipe, setRecipes] = useState([]);
  const [saveRecipes, setSavedRecipes] = useState({
    data: { savedRecipes: [] },
  });
  console.log("Initial saveRecipes:", saveRecipes);

  useEffect(() => {
    let userID = getUserId();

    const fetchRecipe = async () => {
      const ApiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(ApiUrl + "recipe");
        setRecipes(response.data);
        // console.log("Recipes", response);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      const ApiUrl = import.meta.env.VITE_API_URL;

      try {
        const response = await axios.get(
          `${ApiUrl}recipe/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log("saved recipes : ", response);
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
      const ApiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.put(ApiUrl + "recipe", {
        userID,
        recipeID,
      });
      const updatedSavedRecipes = response.data.savedRecipes;
      setSavedRecipes(updatedSavedRecipes);
      console.log("save or unsave", response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home">
      <h1>Recipes</h1>
      <ul className="items">
        {recipe.map((i) => (
          <li key={i._id} className="recipeList">
            <div className="titleRecipe">
              <h2>Recipe Name : {i.name}</h2>
              <span onClick={() => Handlesave(i._id)}>
                {/* {Array.isArray(saveRecipes) && saveRecipes.includes(i._id) ? (
                  <i class="fa-solid fa-bookmark"></i>
                ) : (
                  <i class="fa-regular fa-bookmark"></i>
                )} */}
                {saveRecipes.data.savedRecipes.indexOf(i._id) !== -1 ? (
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
            <div className="img">
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
