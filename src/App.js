import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, Menu, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Error from "./components/navigation/Error";
import Settings from "./components/user/Settings";
import OwnRecipes from "./components/user/OwnRecipes";
import Liked from "./components/user/Liked";
import ShowRecipes from "./components/ShowRecipes";
import { auth } from "./utils/Firebase";
import AuthenticatedUserProvider from "./components/navigation/AuthenticatedUserProvider";
import { AuthenticatedUserContext } from "./components/navigation/AuthenticatedUserProvider";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { lightTheme, darkTheme } from "./utils/Theme";

function App() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [darkMode, setDarkMode] = useState(false);

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
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            >
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
