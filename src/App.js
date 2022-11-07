import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import AddRecipe from "./components/AddRecipe";
import RecipeOfTheDay from "./components/RecipeOfTheDay";
import Error from "./components/navigation/Error";
import Settings from "./components/user/Settings";
import OwnRecipes from "./components/user/OwnRecipes";
import Liked from "./components/user/Liked";

const semiTransparent = "rgba(255, 255, 255, 0.55)";
const theme = createTheme({
  palette: {
    primary: { main: "#f5f5f5", contrastText: "#212121" },
    secondary: { main: "#342b36", contrastText: "#60ebb6" },
    text: { primary: "#212121", secondary: "#51c297" },
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
          backgroundColor: semiTransparent,
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
          backgroundColor: semiTransparent,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 1400,
          backgroundColor: semiTransparent,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<RecipeOfTheDay />} />
            <Route path="add" element={<AddRecipe />} />
            <Route path="user/:ID/settings" element={<Settings />} />
            <Route path="user/:ID/recipes" element={<OwnRecipes />} />
            <Route path="user/:ID/liked" element={<Liked />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
