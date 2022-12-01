import { Box, Typography } from "@mui/material";
import React from "react";

function OwnRecipes() {
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
      <Typography>Omat reseptit</Typography>
    </Box>
  );
}

export default OwnRecipes;