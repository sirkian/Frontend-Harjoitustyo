import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { ExpandMore } from "../utils/Utils";
import axios from "axios";
import { auth } from "../utils/Firebase";

function RecipeCard(props) {
  const [expanded, setExpanded] = useState(-1);
  const [isLiked, setIsLiked] = useState(false);
  const { recipe, i, isOwnRecipe, handleEdit, handleDelete, likes } = props;
  const user = auth.currentUser;

  useEffect(() => {
    if (user === null || typeof likes === "undefined") return;
    likes.forEach((like) => {
      if (recipe.id === like.id) setIsLiked(true);
    });
    // eslint-disable-next-line
  }, []);

  const handleExpand = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  const handleLike = async (id) => {
    if (user === null) return;
    if (!isLiked) {
      try {
        await axios.post(
          "http://localhost:8080/recipes/like/" + id + "/" + user.uid
        );
        setIsLiked(true);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      try {
        await axios.get(
          "http://localhost:8080/recipes/liked/delete/" + id + "/" + user.uid
        );
        setIsLiked(false);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <Card
      sx={{
        width: 600,
        marginY: 5,
        bgcolor: "background.paper",
      }}
    >
      <CardHeader
        title={recipe.name.toUpperCase()}
        subheader={recipe.userName}
        sx={{ textAlign: "center" }}
      />

      <CardMedia
        component="img"
        height="250"
        src={"http://localhost:8080/recipes/download/" + recipe.image}
        alt={recipe.image}
      />

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            {recipe.date.substr(3, 12)}
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            {recipe.category}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          {recipe.time.length > 0 && (
            <Typography sx={{ fontWeight: "light" }}>
              Valmistusaika: <b>{recipe.time}</b> min.
            </Typography>
          )}
          {recipe.portions.length > 0 && (
            <Typography sx={{ fontWeight: "light" }}>
              Annosmäärä: <b>{recipe.portions}</b> annosta
            </Typography>
          )}
        </Box>
        <Typography
          paragraph
          sx={{
            mt: 3,
            fontSize: 14,
            textAlign: "center",
            fontWeight: "light",
          }}
        >
          {recipe.description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton
          sx={{ color: isLiked ? "#eb4034" : "#545454" }}
          onClick={() => handleLike(recipe.id)}
        >
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={() => handleExpand(i)}
          aria-expanded={expanded === i}
          aria-label="show more"
        >
          <ExpandMoreIcon color="secondary" />
        </ExpandMore>
        {isOwnRecipe && (
          <>
            <IconButton color="secondary" onClick={() => handleEdit(recipe)}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(recipe.id)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>

      <Collapse in={expanded === i} timeout="auto" unmountOnExit>
        <CardContent>
          <Box sx={{ marginLeft: 3 }}>
            <Typography variant="h6">Raaka-aineet:</Typography>
            <List dense>
              {recipe.incredients.split("|").map((list, index) => {
                return (
                  <ListItem sx={{ marginBottom: -1 }} key={index}>
                    <ListItemText primary={list} />
                  </ListItem>
                );
              })}
            </List>
          </Box>
          <Box sx={{ marginX: 3, marginTop: 3 }}>
            <Typography variant="h6">Valmistusohje:</Typography>
            <Typography
              paragraph
              sx={{
                fontSize: 16,
                fontWeight: "light",
                marginX: 2,
                marginY: 3,
              }}
            >
              {recipe.instructions}
            </Typography>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default RecipeCard;
