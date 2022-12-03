import { createTheme } from "@mui/material";

const lightTransparent = "rgba(255, 255, 255, 0.55)";
const darkTransparent = "rgba(0, 0, 0, 0.55)";

export const lightTheme = createTheme({
  palette: {
    primary: { main: "#f5f5f5", contrastText: "#212121" },
    secondary: { main: "#342b36", contrastText: "#60ebb6" },
    text: { primary: "#212121", secondary: "#51c297" },
    background: {
      paper: "rgba(255, 255, 255, 0.65)",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: lightTransparent,
          borderRadius: 3,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          border: "none",
          marginTop: 74,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: lightTransparent,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1400,
          backgroundColor: lightTransparent,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: "#f5f5f5", contrastText: "#212121" },
    secondary: { main: "#f0f0f0", contrastText: "#60ebb6" },
    text: { primary: "#f0f0f0", secondary: "#51c297" },
    background: {
      paper: "rgba(0, 0, 0, 0.65)",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: darkTransparent,
          borderRadius: 3,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          border: "none",
          marginTop: 74,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: darkTransparent,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1400,
          backgroundColor: darkTransparent,
        },
      },
    },
  },
});

export const containerBox = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: 15,
  minHeight: "100vh",
  backgroundImage:
    "linear-gradient(90deg, rgba(138,136,179,1) 0%, rgba(153,123,154,1) 100%)",
};
