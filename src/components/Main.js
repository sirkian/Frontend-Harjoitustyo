import { Box } from "@mui/material";
import React from "react";
import AddRecipe from "./AddRecipe";

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
    instructions:
      "Lämmitä hernekeitto kattilassa. Mausta suolalla ja annostele lautasille. Koristele sinapilla.",
  },
];

function Main() {
  return (
    <Box>
      <AddRecipe recipe={recipeOfTheDay} />
    </Box>
  );
}

export default Main;
