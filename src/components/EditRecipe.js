import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Slider,
  Input,
  IconButton,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { timeMarks, portionMarks } from "../utils/utils";

function EditRecipe() {
  const params = useLocation().state.recipe;
  const [error, setError] = useState("");
  const [incredientList, setIncredientList] = useState(params.incredients);
  const [recipe, setValues] = useState(params);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({
      ...recipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddIncredient = () => {
    setIncredientList([...incredientList, { incredient: "" }]);
  };

  const handleRemoveIncredient = (index) => {
    const list = [...incredientList];
    list.splice(index, 1);
    setIncredientList(list);
  };

  const handleIncredientChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...incredientList];
    list[index][name] = value;
    setIncredientList(list);
  };

  const handleImageChange = (e) => {
    setValues({
      ...recipe,
      image: e.target.files[0],
    });
  };

  const validate = () => {
    if (recipe.name.length < 3)
      return setError("Nimen pitää olla vähintään 3 merkkiä pitkä!");
    if (incredientList[0].incredient.length === 0)
      return setError("Lisää vähintään yksi raaka-aine!");
    if (recipe.instructions.length === 0)
      return setError("Lisää valmistusohjeet!");
    if (recipe.category.length === 0)
      return setError("Valitse jokin kategoria!");
    if (recipe.image.length === 0)
      return setError("Lisää reseptille sopiva kuva!");
    handleSubmit();
  };

  const handleSubmit = async () => {
    let incredients = "";
    for (let i = 0; i < incredientList.length; i++) {
      incredients = incredients + incredientList[i].incredient + "|";
    }
    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("time", recipe.time);
    formData.append("portions", recipe.portions);
    formData.append("description", recipe.description);
    formData.append("instructions", recipe.instructions);
    formData.append("image", recipe.image);
    formData.append("category", recipe.category);
    formData.append("incredients", incredients);
    formData.append("date", new Date());
    formData.append("id", recipe.id);
    try {
      await axios.post("http://localhost:8080/recipes/edit", formData);
      navigate(-1);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: 15,
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(90deg, rgba(138,136,179,1) 0%, rgba(153,123,154,1) 100%)",
      }}
    >
      <Paper
        sx={{
          width: 600,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          bgcolor: "rgba(255, 255, 255, 0.65)",
        }}
        component="form"
      >
        <Typography sx={{ textAlign: "center", mb: 3 }} variant="h5">
          Muokkaa reseptiä
        </Typography>
        <FormControl>
          <TextField
            label="Nimi"
            name="name"
            value={recipe.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </FormControl>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {incredientList.map((incredient, index) => (
            <Box
              sx={{
                marginY: 1,
                display: "flex",
                alignItems: "center",
              }}
              key={index}
            >
              <TextField
                required
                sx={{ width: "80%" }}
                label="Raaka-aine"
                name="incredient"
                value={incredient.incredient}
                onChange={(e) => handleIncredientChange(e, index)}
                placeholder="esim. 1 dl sokeria"
              />

              {incredientList.length > 1 && (
                <IconButton
                  sx={{ right: 55, marginRight: -6 }}
                  onClick={() => handleRemoveIncredient(index)}
                >
                  <CancelOutlinedIcon fontSize="large" />
                </IconButton>
              )}
              {incredientList.length - 1 === index && (
                <Button
                  sx={{ marginLeft: 3, paddingY: 1.7 }}
                  color="secondary"
                  variant="contained"
                  onClick={handleAddIncredient}
                >
                  Lisää
                </Button>
              )}
            </Box>
          ))}
        </Box>

        <TextField
          multiline
          label="Kuvaus"
          name="description"
          rows={2}
          value={recipe.description}
          onChange={(e) => handleChange(e)}
        />

        <TextField
          multiline
          label="Valmistusohje"
          name="instructions"
          rows={5}
          value={recipe.instructions}
          onChange={(e) => handleChange(e)}
          required
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ mt: 4, minWidth: 150, padding: 1 }}>
            <InputLabel
              sx={{ position: "absolute", top: -50, left: 80 }}
              id="select-time"
            >
              Valmistusaika
            </InputLabel>
            <Slider
              name="time"
              labelid="select-time"
              sx={{ width: 300, marginBottom: 5 }}
              color="secondary"
              onChange={(e) => handleChange(e)}
              value={recipe.time}
              step={1}
              valueLabelDisplay="auto"
              marks={timeMarks}
              min={10}
              max={90}
            />
          </FormControl>
          <FormControl sx={{ mt: 4, minWidth: 150, padding: 1 }}>
            <InputLabel
              sx={{ position: "absolute", top: -45, left: 80 }}
              id="select-portions"
            >
              Annosmäärä
            </InputLabel>
            <Slider
              name="portions"
              labelid="select-portions"
              sx={{ width: 300, marginBottom: 5 }}
              color="secondary"
              onChange={(e) => handleChange(e)}
              value={recipe.portions}
              step={1}
              valueLabelDisplay="auto"
              marks={portionMarks}
              min={1}
              max={6}
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingY: 2,
          }}
        >
          <FormControl sx={{ marginY: 2, minWidth: 150 }}>
            <InputLabel id="select-category">Kategoria</InputLabel>
            <Select
              name="category"
              value={recipe.category}
              onChange={(e) => handleChange(e)}
            >
              <MenuItem value="">Kategoriat</MenuItem>
              <MenuItem value="Pastat">Pastat</MenuItem>
              <MenuItem value="Tex-Mex"> Tex-Mex </MenuItem>
              <MenuItem value="Aasialainen"> Aasialainen </MenuItem>
              <MenuItem value="Keitot"> Keitot </MenuItem>
              <MenuItem value="Salaatit"> Salaatit </MenuItem>
              <MenuItem value="Kastikkeet"> Kastikkeet </MenuItem>
              <MenuItem value="Grilliruoat"> Grilliruoat </MenuItem>
              <MenuItem value="Jälkiruoat"> Jälkiruoat </MenuItem>
            </Select>
          </FormControl>
          <InputLabel id="upload">
            <Input
              required
              accept="image/*"
              type="file"
              sx={{ display: "none" }}
              id="upload"
              name="upload"
              onChange={(e) => handleImageChange(e)}
            />
            {typeof recipe.image.name === "undefined" ? (
              <Button
                sx={{ paddingY: 1.8, marginY: 2 }}
                color="secondary"
                variant="outlined"
                component="span"
              >
                Vaihda kuva
              </Button>
            ) : (
              <Box sx={{ textAlign: "center", maxWidth: 100 }}>
                <Typography sx={{ fontSize: 12 }}>
                  {recipe.image.name}
                </Typography>
                <Typography sx={{ fontSize: 10 }}>Change</Typography>
              </Box>
            )}
          </InputLabel>
        </Box>
        <Button
          sx={{ paddingY: 1.8 }}
          color="secondary"
          variant="contained"
          onClick={validate}
        >
          {error.length > 0 ? error : "Tallenna muutokset"}
        </Button>
      </Paper>
    </Box>
  );
}

export default EditRecipe;
