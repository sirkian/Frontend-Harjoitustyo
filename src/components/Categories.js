import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import { containerBox } from "../utils/Theme";
import Topbar from "./navigation/Topbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { auth } from "../utils/Firebase";

function Categories() {
  const categories = [
    "Pastat",
    "Tex-Mex",
    "Aasialainen",
    "Keitot",
    "Salaatit",
    "Kastikkeet",
    "Grilliruoat",
    "Jälkiruoat",
  ];
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [category, setCategory] = useState("");
  const user = auth.currentUser;

  const handleShowCategory = async (i) => {
    setCategory("");
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/category/" + categories[i]
      );
      if (user) {
        const likes = await axios.get(
          "http://localhost:8080/recipes/liked/" + user.uid
        );
        setLikes(likes.data);
      }
      setRecipes(res.data);

      setCategory(categories[i]);
    } catch (error) {
      setRecipes([]);
      console.log(error.message);
    }
  };

  return (
    <>
      <Topbar />
      <Box sx={containerBox}>
        {category.length > 0 && (
          <Box
            sx={{
              textAlign: "center",
              backgroundColor: "background.paper",
              padding: 4,
              borderRadius: 2,
              marginTop: 8,
              width: 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton
              sx={{ fontSize: 16, alignSelf: "flex-start" }}
              color="secondary"
              onClick={() => setCategory("")}
            >
              <ArrowBackIcon fontSize="small" /> Takaisin
            </IconButton>
            {recipes.length > 0 ? (
              <Typography variant="h5">
                Kategorian {category} reseptit:
              </Typography>
            ) : (
              <Typography variant="h5">
                Kategoriassa {category} ei ole vielä reseptejä
              </Typography>
            )}
          </Box>
        )}
        {category.length > 0 ? (
          recipes.map((recipe, i) => {
            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                likes={likes}
                i={i}
                isOwnRecipe={false}
              />
            );
          })
        ) : (
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
            {categories.map((category, index) => {
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
                  key={index}
                  onClick={() => handleShowCategory(index)}
                >
                  {category}
                </Typography>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
}

export default Categories;
