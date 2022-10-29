import {
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuList,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

function Topbar() {
  const [menu, setMenu] = useState(null);

  const handleOpenMenu = (e) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  return (
    <Box>
      <AppBar
        sx={{
          zIndex: 1400,
        }}
        style={{
          "background-image":
            "radial-gradient(circle, rgba(241,241,241,1) 0%, rgba(219,219,219,0.5) 100%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 1.5,
          }}
        >
          <Typography
            sx={{
              bgcolor: "#60ebb6",
              borderRadius: 1,
              paddingX: 2,
              paddingY: 0.5,
            }}
            variant="h4"
          >
            topbar
          </Typography>

          <Box
            sx={{
              position: "absolute",
              right: 70,
              display: "flex",
            }}
          >
            <IconButton onClick={handleOpenMenu}>
              <AccountCircleOutlinedIcon fontSize="large" color="secondary" />
            </IconButton>
            <MenuList>
              <Menu
                anchorEl={menu}
                anchorOrigin={{ vertical: 60 }}
                open={Boolean(menu)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <AdminPanelSettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Asetukset" />
                </MenuItem>

                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <MenuBookOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Omat reseptit" />
                </MenuItem>

                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <FavoriteBorderOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Suosikit" />
                </MenuItem>

                <MenuItem onClick={handleCloseMenu}>
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Kirjaudu ulos" />
                </MenuItem>
              </Menu>
            </MenuList>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Topbar;
