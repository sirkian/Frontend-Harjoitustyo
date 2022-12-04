import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { containerBox } from "../utils/Theme";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan kategorioita...");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/categories/all");
      setCategories(res.data);
      setErrorMsg("");
    } catch (error) {
      setCategories([]);
      setErrorMsg("Haku epäonnistui.");
      console.log(error.message);
    }
  };

  const handleShowCategory = async (category) => {
    try {
      const res = await axios.get("http://localhost:8080/recipes/all");
      let recipeList = [];
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].category === category) {
          recipeList.push(res.data[i]);
        }
      }
      // navigate("/", { state: { recipeList } });
      setErrorMsg("");
    } catch (error) {
      setRecipes([]);
      setErrorMsg("Haku epäonnistui.");
      console.log(error.message);
    }
  };

  console.log(recipes);
  return (
    <Box sx={containerBox}>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "background.paper",
          paddingY: 10,
          paddingX: 40,
          borderRadius: 2,
          marginTop: 8,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 5 }}>
          Kategoriat
        </Typography>
        {categories.map((category) => {
          return (
            <Typography
              sx={{
                fontSize: 18,
                marginBottom: 2,
                cursor: "pointer",
                bgcolor: "background.paper",
                paddingY: 0.8,
                paddingX: 2,
                borderRadius: 1,
              }}
              key={category.id}
              onClick={() => handleShowCategory(category.category)}
            >
              {category.category}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}

export default Categories;
