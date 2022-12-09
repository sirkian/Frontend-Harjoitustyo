import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Topbar from "../navigation/Topbar";
import { auth } from "../../utils/Firebase";
import {
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Settings() {
  const currentUser = auth.currentUser;
  const navigate = useNavigate();
  const [user, setUser] = useState({
    displayName: currentUser.displayName,
    email: currentUser.email,
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    try {
      updateProfile(currentUser, {
        displayName: user.displayName,
        email: user.email,
      });
      alert("Tietojen päivitys onnistui");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleResetPassword = () => {
    try {
      sendPasswordResetEmail(auth, currentUser.email);
      alert("Resetointilinkki lähetetty osoitteeseen " + currentUser.email);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = () => {
    if (
      window.confirm("Haluatko varmasti poistaa käyttäjätunnuksesi pysyvästi?")
    ) {
      try {
        deleteUser(currentUser);
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <Topbar />
      <Box sx={containerBox}>
        <Box sx={innerBox}>
          <Typography variant="h5">Asetukset</Typography>
          <Typography variant="h6" sx={{ marginTop: 3 }}>
            Muuta tietoja
          </Typography>
          <TextField
            name="displayName"
            label="Nimimerkki"
            value={user.displayName}
            onChange={(e) => handleChange(e)}
            sx={{ marginTop: 3 }}
          />
          <TextField
            name="email"
            label="Sähköpostiosoite"
            value={user.email}
            onChange={(e) => handleChange(e)}
            sx={{ marginTop: 3 }}
          />
          <Button
            sx={{ color: "text.contrast", marginTop: 3 }}
            onClick={handleUpdate}
          >
            Päivitä tiedot
          </Button>
        </Box>
        <Box sx={innerBox}>
          <Typography variant="h5">Muut toiminnot</Typography>
          <Button
            sx={{ color: "text.contrast", marginTop: 3 }}
            onClick={handleResetPassword}
          >
            Nollaa salasana
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "red", marginTop: 3 }}
            onClick={handleDelete}
          >
            Poista käyttäjä
          </Button>
        </Box>
      </Box>
    </>
  );
}

const containerBox = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  paddingTop: 15,
  minHeight: "100vh",
  backgroundColor: "background.main",
};

const innerBox = {
  textAlign: "center",
  backgroundColor: "background.paper",
  padding: 4,
  borderRadius: 2,
  marginTop: 8,
  width: 600,
  display: "flex",
  flexDirection: "column",
};

export default Settings;
