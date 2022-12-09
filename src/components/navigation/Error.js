import { Box, Typography } from "@mui/material";
import React from "react";
import Topbar from "./Topbar";

function Error() {
  return (
    <>
      <Topbar />
      <Box sx={containerBox}>
        <Box sx={innerBox}>
          <Typography variant="h2">404</Typography>
          <Typography variant="h6">Page not found.</Typography>
        </Box>
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

const innerBox = {
  textAlign: "center",
  backgroundColor: "background.paper",
  paddingY: 20,
  paddingX: 40,
  borderRadius: 10,
};

export default Error;
