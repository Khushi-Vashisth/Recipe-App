import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";

function Home() {
  const [recipe, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipe");
        setRecipes(response.data);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();
  }, []);
  return (
    <div className="home">
      <h1>Recipes</h1>
      <ul>
        {recipe.map((i) => (
          <li key={i._id} className="recipeList">
            <div>
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

export default Home;
