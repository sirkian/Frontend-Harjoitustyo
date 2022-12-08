import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { containerBox } from "../utils/Theme";
import { useLocation } from "react-router";
import Topbar from "./navigation/Topbar";

function ShowRecipes() {
  const loc = useLocation();
  const params = loc.state;
  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
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
    if (params === null) return;
    if (params.clear) {
      fetchRecipes();
      return;
    } else if (params.query.length > 0) {
      searchRecipes(params.query);
    }
    // eslint-disable-next-line
  }, [loc.key]);

  const searchRecipes = async (query) => {
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/search/" + query
      );
      if (res.data.length === 0 && typeof query !== "undefined") {
        setErrorMsg("Haulla " + query + " ei löytynyt reseptejä");
        return (query = "");
      }
      setRecipes(res.data);
      res.data.length > 1 && typeof query !== "undefined"
        ? setErrorMsg(
            "Haulla " + query + " löytyi " + res.data.length + " reseptiä:"
          )
        : setErrorMsg(
            "Haulla " + query + " löytyi " + res.data.length + " resepti:"
          );
      query = "";
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

export default ShowRecipes;
