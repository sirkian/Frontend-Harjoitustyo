import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
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

const recipeOfTheDay = [
  {
    id: 1,
    name: "Hernekeitto",
    incredientList: [
      { incredient: "1 prk Jalostajan hernekeittoa" },
      { incredient: "2 rkl Turun sinappia" },
      { incredient: "ripaus suolaa" },
    ],
    time: "alle 10 min",
    portions: "2 annosta",
    description:
      "Torstai-iltojen klassikko, joka sopii erityisen hyvin viileneviin syysiltoihin.",
    instructions:
      "Lämmitä hernekeitto kattilassa. Mausta suolalla ja annostele lautasille. Koristele sinapilla.",
  },
  {
    id: 2,
    name: "Pannukakku",
    incredientList: [
      { incredient: "2 kpl kananmunaa" },
      { incredient: "1,5 dl	sokeria" },
      { incredient: "ripaus suolaa" },
      { incredient: "1 tl leivinjauhetta" },
      { incredient: "1 tl vaniljasokeria" },
      { incredient: "8 dl maitoa" },
      { incredient: "4 dl vehnäjauhoja" },
      { incredient: "100g voita" },
    ],
    time: "30 min",
    portions: "4 annosta",
    description: "Kotikokista varastettu pannariohje.",
    instructions:
      "1. Sulata margariini 2. Sekoita kuivat aineet keskenään 3. Lisää maito, munat sekä sulatettu, jäähtynyt margariini 4. Sekoita, kunnes seos on tasaista.Kaada taikina leivinpaperille uunipellille ja paista 200-225 asteessa n. ½ tuntia.",
  },
];

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

function RecipeOfTheDay() {
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
      <Box>
        {recipeOfTheDay.map((recipe) => {
          return (
            <Card
              sx={{
                maxWidth: 600,
                marginY: 5,
                bgcolor: "rgba(255, 255, 255, 0.65)",
              }}
              key={recipe.id}
            >
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
                <Typography
                  sx={{ mt: 3, fontSize: 14, textAlign: "center" }}
                  paragraph
                >
                  {recipe.description}
                </Typography>
              </CardContent>

              <CardActions disableSpacing>
                <IconButton onClick={() => setLikes(likes + 1)}>
                  <FavoriteIcon />
                </IconButton>
                <Typography>{likes}</Typography>
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
                  <Box sx={{ paddingX: 5 }}>
                    <Typography variant="h5" sx={{ fontSize: 20 }}>
                      Raaka-aineet:
                    </Typography>
                    <List>
                      {recipe.incredientList.map((list, index) => {
                        return (
                          <ListItem sx={{ paddingY: 0 }} key={index}>
                            <ListItemText primary={list.incredient} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                  <Box sx={{ paddingX: 5 }}>
                    <Typography variant="h5" sx={{ fontSize: 20, mt: 3 }}>
                      Valmistusohje:
                    </Typography>
                    <Typography
                      sx={{ paddingX: 2, mt: 2, fontSize: 14 }}
                      paragraph
                    >
                      {recipe.instructions}
                    </Typography>
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
