import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import placeholder from "../img/placeholder.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";

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

function RecipeOfTheDay(props) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Typography variant="h5">Päivän resepti</Typography>
      <Box>
        {props.recipe.map((recipe) => {
          return (
            <Card sx={{ maxWidth: 600, marginY: 5 }} key={recipe.id}>
              <CardHeader title={recipe.name} subheader="NIMIMERKKI" />

              <CardMedia
                component="img"
                height="194"
                image={placeholder}
                alt="PLACEHOLDER"
              />

              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {recipe.time.length > 0 && (
                    <Typography>
                      Valmistusaika: <b>{recipe.time}</b>
                    </Typography>
                  )}
                  {recipe.portions.length > 0 && (
                    <Typography>
                      Annosmäärä: <b>{recipe.portions}</b>
                    </Typography>
                  )}
                </Box>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton>
                  <FavoriteIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Box>
                    <Typography variant="h5">Raaka-aineet:</Typography>
                    <List>
                      {recipe.incredientList.map((list, index) => {
                        return (
                          <ListItem key={index}>
                            <ListItemText primary={list.incredient} />
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
      </Box>
    </Box>
  );
}

export default RecipeOfTheDay;
