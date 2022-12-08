import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Error from "./components/navigation/Error";
import Settings from "./components/user/Settings";
import OwnRecipes from "./components/user/OwnRecipes";
import Liked from "./components/user/Liked";
import ShowRecipes from "./components/ShowRecipes";
import AuthenticatedUserProvider from "./components/navigation/AuthenticatedUserProvider";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { lightTheme, darkTheme } from "./utils/Theme";
import Categories from "./components/Categories";
import Sidebar from "./components/navigation/Sidebar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <AuthenticatedUserProvider>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
              }
            >
              <Route index element={<ShowRecipes />} />
              <Route path="add" element={<AddRecipe />} />
              <Route path="edit" element={<EditRecipe />} />
              <Route path="categories" element={<Categories />} />
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
