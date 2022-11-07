import { Box, Typography } from "@mui/material";
import React from "react";

function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 45,
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(90deg, rgba(138,136,179,1) 0%, rgba(153,123,154,1) 100%)",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          paddingY: 20,
          paddingX: 40,
          borderRadius: 10,
        }}
      >
        <Typography variant="h2">404</Typography>
        <Typography variant="h6">Page not found.</Typography>
      </Box>
    </Box>
  );
}

export default Error;
