import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { getUserId } from "../getUser";
import { useNavigate } from "react-router-dom";

function CreateRecipe() {
  const navigate = useNavigate();
  const userID = getUserId();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
    time: 0,
    owner: userID,
  });

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  console.log(recipe);

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/recipe", recipe);
      console.log(response);
      alert("Recipe Created Dear !");
      navigate("/");
    } catch (err) {
      return console.error(err);
    }
  };

  return (
    <div className="createRecipe">
      <form className="create" onSubmit={HandleSubmit}>
        <h2>About Recipe </h2>
        <label htmlFor="name">Recipe Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={HandleChange}
          value={recipe.name}
        />
        <label htmlFor="ingredient"> Ingredients for Recipe : </label>
        <input
          type="text"
          id="ingredient"
          name="ingredients"
          onChange={HandleChange}
          value={recipe.ingredients}
        />
        <label htmlFor="textarea">Instructions : </label>
        <textarea
          id="textarea"
          className="textarea"
          name="instructions"
          onChange={HandleChange}
          value={recipe.instructions}
        ></textarea>
        <label htmlFor="image">Enter Image URL : </label>
        <input
          type="text"
          id="image"
          name="imageUrl"
          onChange={HandleChange}
          value={recipe.imageUrl}
        />
        <label htmlFor="time">Cooking time (minute) : </label>
        <input
          type="number"
          id="cookies"
          name="time"
          onChange={HandleChange}
          value={recipe.time}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
