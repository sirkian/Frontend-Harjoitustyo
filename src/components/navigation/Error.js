import { Box, Typography } from "@mui/material";
import { containerBox } from "../../utils/Theme";
import React from "react";

function Error() {
  return (
    <Box sx={containerBox}>
      <Box
        sx={{
          textAlign: "center",
          backgroundColor: "background.paper",
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
