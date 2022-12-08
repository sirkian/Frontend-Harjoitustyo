import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../../utils/Firebase";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function Sidebar({ darkMode, setDarkMode }) {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const clear = true;

  const handleClear = () => {
    setQuery("");
    navigate("/", { state: { clear, query } });
  };

  return (
    <Box>
      <Outlet />
      <Drawer variant="permanent" anchor="left">
        <List
          sx={{
            marginTop: 15,
            marginLeft: 8,
            marginRight: -8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 450,
          }}
        >
          <ListItem sx={{ marginBottom: 5 }}>
            <TextField
              sx={{ padding: 1, width: "70%" }}
              variant="standard"
              placeholder="Hae.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <IconButton
              sx={{ left: -50, color: "text.contrast" }}
              onClick={() => navigate("/", { state: { query } })}
            >
              <SearchIcon />
            </IconButton>
            {query.length > 0 && (
              <IconButton
                sx={{
                  left: 270,
                  color: "text.contrast",
                  position: "absolute",
                }}
                onClick={handleClear}
              >
                <ClearIcon />
              </IconButton>
            )}
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Etusivu" />
            </ListItem>
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to={user ? "add" : "login"}>
              <ListItemText primary="Lisää resepti" />
            </ListItem>
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to="categories">
              <ListItemText primary="Kategoriat" />
            </ListItem>
          </ListItem>
          <ListItem>
            <ListItem button onClick={() => setDarkMode(!darkMode)}>
              <ListItemText
                primary={darkMode ? "Vaalea teema" : "Tumma teema"}
              />
            </ListItem>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
