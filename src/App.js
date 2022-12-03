import React, { useContext, useEffect, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Error from "./components/navigation/Error";
import Settings from "./components/user/Settings";
import OwnRecipes from "./components/user/OwnRecipes";
import Liked from "./components/user/Liked";
import ShowRecipes from "./components/ShowRecipes";
import { auth } from "./utils/firebase";
import AuthenticatedUserProvider from "./components/navigation/AuthenticatedUserProvider";
import { AuthenticatedUserContext } from "./components/navigation/AuthenticatedUserProvider";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

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
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        try {
          await (authenticatedUser
            ? setUser(authenticatedUser)
            : setUser(null));
        } catch (err) {
          console.error(err);
        }
      }
    );
    return unsubscribeAuth;
  }, []);

  return (
    <AuthenticatedUserProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route index element={<ShowRecipes />} />
              <Route path="add" element={<AddRecipe />} />
              <Route path="edit" element={<EditRecipe />} />
              <Route path="user/:ID/settings" element={<Settings />} />
              <Route path="user/:ID/recipes" element={<OwnRecipes />} />
              <Route path="user/:ID/liked" element={<Liked />} />
              <Route path="*" element={<Error />} />
            </Route>
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <CssBaseline />
      </ThemeProvider>
    </AuthenticatedUserProvider>
  );
}

export default App;
