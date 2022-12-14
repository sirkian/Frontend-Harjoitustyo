import { Box, Typography, Alert, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, database } from "../../utils/Firebase";
import RecipeCard from "../RecipeCard";
import Topbar from "../navigation/Topbar";
import { ref, remove } from "firebase/database";

function OwnRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
  }, [recipes.length]);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/recipes/all/" + user.uid
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

  const handleEdit = async (recipe) => {
    const list = { ...recipe.incredients.split("|") };
    const keys = Object.keys(list);
    const res = [];
    for (let i = 0; i < keys.length; i++) {
      if (list[keys[i]].length > 0) {
        res.push({
          incredient: list[keys[i]],
        });
      }
    }
    const recipeToEdit = await { ...recipe, incredients: res };
    navigate("/edit", { state: { recipe: recipeToEdit } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haluatko varmasti poistaa reseptin?")) {
      try {
        await axios.get("http://localhost:8080/recipes/delete/" + id);
        remove(ref(database, "comments/" + id));
        setOpen(true);
        fetchRecipes();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <Topbar />
      <Box sx={containerBox}>
        {recipes
          .slice(0)
          .reverse()
          .map((recipe, i) => {
            return (
              <RecipeCard
                key={recipe.id}
                likes={likes}
                recipe={recipe}
                i={i}
                isOwnRecipe={true}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            );
          })}

        {recipes.length === 0 && (
          <Typography>Ei omia reseptejä (vielä!).</Typography>
        )}
        {errorMsg.length > 0 && <Typography>{errorMsg}</Typography>}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={() => setOpen(false)}
          autoHideDuration={6000}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Resepti poistettu!
          </Alert>
        </Snackbar>
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

export default OwnRecipes;
