import {
  IconButton,
  Box,
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
import { Link, Outlet } from "react-router-dom";

function Topbar() {
  const [menu, setMenu] = useState(null);
  const user = {
    ID: 1,
    nickname: "perttiplaceholder",
    email: "pera@gmail.com",
  };

  const handleOpenMenu = (e) => {
    setMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenu(null);
  };

  return (
    <Box>
      <Outlet />
      <AppBar>
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
                anchorOrigin={{ vertical: 60, horizontal: 0 }}
                open={Boolean(menu)}
                onClose={handleCloseMenu}
              >
                <MenuItem component={Link} to={"user/" + user.ID + "/settings"}>
                  <ListItemIcon>
                    <AdminPanelSettingsOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Asetukset" />
                </MenuItem>

                <MenuItem component={Link} to={"user/" + user.ID + "/recipes"}>
                  <ListItemIcon>
                    <MenuBookOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Omat reseptit" />
                </MenuItem>

                <MenuItem component={Link} to={"user/" + user.ID + "/liked"}>
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
