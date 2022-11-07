import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Box,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
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
            />
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to="/">
              <ListItemText primary="Etusivu" />
            </ListItem>
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to="add">
              <ListItemText primary="Lisää resepti" />
            </ListItem>
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to="categories">
              <ListItemText primary="Kategoriat" />
            </ListItem>
          </ListItem>
          <ListItem>
            <ListItem button component={Link} to="mealdb">
              <ListItemText primary="Inspiraatio" />
            </ListItem>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
