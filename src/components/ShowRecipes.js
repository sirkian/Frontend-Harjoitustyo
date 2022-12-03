import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { containerBox } from "../utils/Theme";
import { useLocation } from "react-router";

function ShowRecipes() {
  const params = useLocation().state;
  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/recipes/all");
      setRecipes(res.data);
      setErrorMsg("");
    } catch (error) {
      setRecipes([]);
      setErrorMsg("Haku epäonnistui.");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (params !== null) {
      if (params.clear) {
        fetchRecipes();
        return;
      }
      setQuery(params.query);
    } else {
      return;
    }
    if (query.length > 0) {
      searchRecipes();
    }
  }, [params]);

  const searchRecipes = async () => {
    console.log("HAETAA", query);
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/search/" + query
      );
      console.log("DATA", res.data.length);
      if (res.data.length === 0) return;
      setRecipes(res.data);
      setErrorMsg("");
      setQuery("");
    } catch (error) {
      setRecipes([]);
      setErrorMsg("Haku epäonnistui.");
      console.log(error.message);
    }
  };

  console.log(recipes);

  return (
    <Box sx={containerBox}>
      {recipes
        .slice(0)
        .reverse()
        .map((recipe, i) => {
          return <RecipeCard recipe={recipe} i={i} isOwnRecipe={false} />;
        })}
      {recipes.length === 0 && <Typography>Ei reseptejä (vielä!).</Typography>}
      {errorMsg.length > 0 && <Typography>{errorMsg}</Typography>}
    </Box>
  );
}

export default ShowRecipes;
