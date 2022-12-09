import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { auth } from "../utils/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, user.email, user.password);
      navigate("/");
    } catch (err) {
      setEmailError("");
      setPwdError("");
      if (err.code === "auth/invalid-email") {
        setEmailError("Sähköpostin pitää olla muodossa 'email@email.com'.");
      } else if (err.code === "auth/user-not-found") {
        setEmailError("Sähköpostiosoitteella ei ole käyttäjätunnusta.");
      } else if (err.code === "auth/wrong-password") {
        setPwdError("Väärä salasana.");
      } else {
        setPwdError(err.message);
      }
    }
  };

  return (
    <Box sx={containerBox}>
      <Box sx={innerBox}>
        <TextField
          name="email"
          value={user.email}
          onChange={(e) => handleChange(e)}
          placeholder="Sähköpostiosoite"
        />
        <Typography>{emailError}</Typography>
        <TextField
          type="password"
          name="password"
          value={user.password}
          onChange={(e) => handleChange(e)}
          placeholder="Salasana"
        />
        <Typography>{pwdError}</Typography>
        <Button
          sx={{ marginTop: 5 }}
          color="secondary"
          variant="contained"
          onClick={handleLogin}
        >
          Kirjaudu sisään
        </Button>
        <Typography sx={text} onClick={() => navigate("/signup")}>
          Uusi käyttäjä? Rekisteröidy tästä.
        </Typography>
      </Box>
    </Box>
  );
}

const containerBox = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: "background.main",
};

const innerBox = {
  marginTop: 40,
  height: "100%",
  bgcolor: "rgba(255, 255, 255, 0.65)",
  display: "flex",
  flexDirection: "column",
  padding: 5,
  borderRadius: 3,
};

const text = {
  marginTop: 3,
  textAlign: "center",
  cursor: "pointer",
  color: "primary.contrastText",
};

export default LogIn;
