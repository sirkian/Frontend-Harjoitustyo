import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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

function RecipeCard(props) {
  const [expanded, setExpanded] = useState(-1);
  const [open, setOpen] = useState(false);
  const { recipe, i, isOwnRecipe, handleEdit, handleDelete } = props;

  const handleExpand = (i) => {
    setExpanded(expanded === i ? -1 : i);
  };

  return (
    <>
      <Card
        sx={{
          width: 600,
          marginY: 5,
          bgcolor: "background.paper",
        }}
        key={recipe.id}
      >
        <CardHeader title={recipe.name} subheader={recipe.userName} />

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
          <IconButton color="secondary">
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
    </>
  );
}

export default RecipeCard;
