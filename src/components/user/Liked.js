import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "../RecipeCard";
import { auth } from "../../utils/Firebase";
import Topbar from "../navigation/Topbar";

function Liked() {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");
  const user = auth.currentUser;

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/liked/" + user.uid
      );
      const likes = await axios.get(
        "http://localhost:8080/recipes/liked/" + user.uid
      );
      setRecipes(res.data);
      setLikes(likes.data);
      setErrorMsg("");
    } catch (error) {
      setRecipes([]);
      setErrorMsg("Haku epäonnistui.");
      console.log(error.message);
    }
  };
  return (
    <>
      <Topbar />
      <Box sx={containerBox}>
        {errorMsg.length > 0 && <Typography>{errorMsg}</Typography>}
        {recipes
          .slice(0)
          .reverse()
          .map((recipe, i) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                likes={likes}
                i={i}
                isOwnRecipe={false}
              />
            );
          })}
        {recipes.length === 0 && (
          <Typography>Ei reseptejä (vielä!).</Typography>
        )}
      </Box>
    </>
  );
}

const containerBox = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: 15,
  minHeight: "100vh",
  backgroundColor: "background.main",
};

export default Liked;
