import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../RecipeCard";
import { containerBox } from "../../utils/Theme";
import { auth } from "../../utils/Firebase";

function Liked() {
  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");
  const user = auth.currentUser;

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/liked/" + user.uid
      );
      setRecipes(res.data);
      console.log(res.data);
      setErrorMsg("");
    } catch (error) {
      setRecipes([]);
      setErrorMsg("Haku epäonnistui.");
      console.log(error.message);
    }
  };
  return (
    <Box sx={containerBox}>
      {errorMsg.length > 0 && <Typography>{errorMsg}</Typography>}
      {recipes
        .slice(0)
        .reverse()
        .map((recipe, i) => {
          return <RecipeCard recipe={recipe} i={i} isOwnRecipe={false} />;
        })}
      {recipes.length === 0 && <Typography>Ei reseptejä (vielä!).</Typography>}
    </Box>
  );
}

export default Liked;
