import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { auth } from "../utils/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [pwdError, setPwdError] = useState("");
  const [user, setUser] = useState({
    displayName: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      if (
        user.displayName.length > 0 &&
        user.email.length > 0 &&
        user.password.length > 0
      ) {
        if (user.password === user.passwordCheck) {
          await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
          ).then((res) => {
            updateProfile(auth.currentUser, { displayName: user.displayName });
          });
          navigate("/");
        } else {
          setPwdError("Salasanat eivät vastaa toisiaan.");
        }
      }
    } catch (err) {
      setEmailError("");
      setPwdError("");
      if (err.code === "auth/invalid-email") {
        setEmailError("Sähköpostin pitää olla muodossa 'email@email.com'.");
      } else if (err.code === "auth/email-already-in-use") {
        setEmailError("Sähköpostiosoite on jo käytössä.");
      } else if (err.code === "auth/weak-password") {
        setPwdError("Salasanan pitää olla vähintään 6 merkkiä.");
      } else {
        setPwdError(err.message);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(90deg, rgba(138,136,179,1) 0%, rgba(153,123,154,1) 100%)",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          marginTop: 40,
          height: "100%",
          bgcolor: "rgba(255, 255, 255, 0.65)",
          display: "flex",
          flexDirection: "column",
          padding: 5,
          borderRadius: 3,
        }}
      >
        <TextField
          name="displayName"
          value={user.displayName}
          onChange={(e) => handleChange(e)}
          placeholder="Nimimerkki"
        />
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
        <TextField
          type="password"
          name="passwordCheck"
          value={user.passwordCheck}
          onChange={(e) => handleChange(e)}
          placeholder="Anna salasana uudelleen"
        />
        <Typography>{pwdError}</Typography>
        <Button
          sx={{ marginTop: 5 }}
          color="secondary"
          variant="contained"
          onClick={handleSignup}
        >
          Rekisteröidy
        </Button>
        <Typography
          sx={{ marginTop: 3, textAlign: "center", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Oletko jo rekisteröitynyt? Kirjaudu sisään.
        </Typography>
      </Box>
    </Box>
  );
}

export default SignUp;
