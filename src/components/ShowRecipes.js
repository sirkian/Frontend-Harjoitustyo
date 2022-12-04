import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { containerBox } from "../utils/Theme";
import { useLocation } from "react-router";

function ShowRecipes() {
  const loc = useLocation();
  const params = loc.state;
  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");
  const [query, setQuery] = useState("");
  console.log(recipes);

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
      if (query.length > 0) {
        searchRecipes();
      }
    } else {
      return;
    }
  }, [loc.key]);

  const searchRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/search/" + query
      );
      console.log("DATA", res.data.length);
      if (res.data.length === 0 && typeof query !== "undefined") {
        setErrorMsg("Haulla " + query + " ei löytynyt reseptejä");
        setQuery("");
        return;
      }
      setRecipes(res.data);
      res.data.length > 1 && typeof query !== "undefined"
        ? setErrorMsg(
            "Haulla " + query + " löytyi " + res.data.length + " reseptiä:"
          )
        : setErrorMsg(
            "Haulla " + query + " löytyi " + res.data.length + " resepti:"
          );
      setQuery("");
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

export default ShowRecipes;
