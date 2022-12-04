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
import React, { useEffect, useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, Outlet } from "react-router-dom";
import { auth } from "../../utils/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);

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
            {user !== null ? (
              <>
                <IconButton onClick={handleOpenMenu}>
                  <AccountCircleOutlinedIcon
                    fontSize="large"
                    color="secondary"
                  />
                </IconButton>
                <MenuList>
                  <Menu
                    anchorEl={menu}
                    anchorOrigin={{ vertical: 60, horizontal: 0 }}
                    open={Boolean(menu)}
                    onClose={handleCloseMenu}
                  >
                    <MenuItem>
                      <Typography>Moikka, {user.displayName} !</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseMenu}
                      component={Link}
                      to={"user/" + user.uid + "/settings"}
                    >
                      <ListItemIcon>
                        <AdminPanelSettingsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Asetukset" />
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseMenu}
                      component={Link}
                      to={"user/" + user.uid + "/recipes"}
                    >
                      <ListItemIcon>
                        <MenuBookOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Omat reseptit" />
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseMenu}
                      component={Link}
                      to={"user/" + user.uid + "/liked"}
                    >
                      <ListItemIcon>
                        <FavoriteBorderOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Suosikit" />
                    </MenuItem>
                    <MenuItem onClick={() => signOut(auth)}>
                      <ListItemIcon>
                        <LogoutOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Kirjaudu ulos" />
                    </MenuItem>
                  </Menu>
                </MenuList>
              </>
            ) : (
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Kirjaudu sisään
              </Typography>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Topbar;
