import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  TextField,
} from "@mui/material";
import React from "react";

// const drawerWidth = 300;

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left">
      <List
        sx={{
          marginTop: 10,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 450,
        }}
      >
        <ListItem sx={{ marginBottom: 5 }}>
          <TextField variant="standard" placeholder="Hae.." />
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemText primary="Etusivu" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Lisää resepti" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Kategoriat" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Inspiraatio" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
