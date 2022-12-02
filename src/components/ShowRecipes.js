import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function ShowRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("Haetaan reseptejä...");
  const [expanded, setExpanded] = useState(-1);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigate = async (recipe) => {
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
    navigate("edit", { state: { recipe: recipeToEdit } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Haluatko varmasti poistaa reseptin?")) {
      try {
        await axios.get("http://localhost:8080/recipes/delete/" + id);
        setOpen(true);
        fetchRecipes();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleExpand = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 15,
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(90deg, rgba(138,136,179,1) 0%, rgba(153,123,154,1) 100%)",
      }}
    >
      {recipes
        .slice(0)
        .reverse()
        .map((recipe, i) => {
          return (
            <Card
              sx={{
                width: 600,
                marginY: 5,
                bgcolor: "rgba(255, 255, 255, 0.65)",
              }}
              key={recipe.id}
            >
              <CardHeader title={recipe.name} subheader="NIMIMERKKI" />

              <CardMedia
                component="img"
                height="194"
                src={"http://localhost:8080/recipes/download/" + recipe.image}
                alt={recipe.image}
              />

              <CardContent>
                <Typography>{recipe.date.substr(3, 12)}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {recipe.time.length > 0 && (
                    <Typography>
                      Valmistusaika: <b>{recipe.time}</b> min.
                    </Typography>
                  )}
                  {recipe.portions.length > 0 && (
                    <Typography>
                      Annosmäärä: <b>{recipe.portions}</b> annosta
                    </Typography>
                  )}
                </Box>
                <Typography
                  sx={{ mt: 3, fontSize: 14, textAlign: "center" }}
                  paragraph
                >
                  {recipe.description}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={() => handleExpand(i)}
                  aria-expanded={expanded === i}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <IconButton onClick={() => handleNavigate(recipe)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(recipe.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>

              <Collapse in={expanded === i} timeout="auto" unmountOnExit>
                <CardContent>
                  <Box>
                    <Typography variant="h5">Raaka-aineet:</Typography>
                    <List>
                      {recipe.incredients.split("|").map((list, index) => {
                        return (
                          <ListItem key={index}>
                            <ListItemText primary={list} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                  <Box>
                    <Typography variant="h5">Valmistusohje:</Typography>
                    <Typography paragraph>{recipe.instructions}</Typography>
                  </Box>
                </CardContent>
              </Collapse>
            </Card>
          );
        })}
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
          Recipe deleted!
        </Alert>
      </Snackbar>
      {recipes.length === 0 && <Typography>Ei reseptejä (vielä!).</Typography>}
      {errorMsg.length > 0 && <Typography>{errorMsg}</Typography>}
    </Box>
  );
}

export default ShowRecipes;
