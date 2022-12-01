import React, { useState } from "react";
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

const timeMarks = [
  {
    value: 10,
    label: "<10 min",
  },
  {
    value: 45,
    label: "45 min",
  },
  {
    value: 90,
    label: "90+ min",
  },
];

const portionMarks = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
  {
    value: 6,
    label: "6+",
  },
];

function AddRecipe() {
  // TODO: REFAKTOROI TILANHALLINTA ( REDUCER ? )
  // JA LISÄÄ AINAKIN TAGIT, MÄÄRÄT, KUVA... ( MUITA ? )
  const [name, setName] = useState("");
  const [incredientList, setIncredientList] = useState([{ incredient: "" }]);
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState(0);
  const [portions, setPortions] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleInstructionsChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePortionChange = (e) => {
    setPortions(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    let incredients = "";
    for (let i = 0; i < incredientList.length; i++) {
      incredients = incredients + incredientList[i].incredient + "|";
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("time", time);
    formData.append("portions", portions);
    formData.append("description", description);
    formData.append("instructions", instructions);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("incredients", incredients);
    formData.append("date", new Date());
    try {
      await axios.post("http://localhost:8080/recipes/add", formData);
      handleClear();
    } catch (error) {
      handleClear();
      console.log(error.message);
    }
  };

  // TODO: REFAKTOROI TILANHALLINNAN YHTEYDESSÄ
  const handleClear = () => {
    setName("");
    setIncredientList([{ incredient: "" }]);
    setInstructions("");
    setDescription("");
    setTime(0);
    setPortions(0);
    setImage([]);
    setCategory("");
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
          Lisää uusi resepti
        </Typography>
        <FormControl>
          <TextField
            label="Nimi"
            name="name"
            value={name}
            onChange={(e) => handleNameChange(e)}
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
          rows={2}
          value={description}
          onChange={(e) => handleDescriptionChange(e)}
        />

        <TextField
          multiline
          label="Valmistusohje"
          name="instructions"
          rows={5}
          value={instructions}
          onChange={(e) => handleInstructionsChange(e)}
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
              labelid="select-time"
              sx={{ width: 300, marginBottom: 5 }}
              color="secondary"
              onChange={(e) => handleTimeChange(e)}
              value={time}
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
              labelid="select-portions"
              sx={{ width: 300, marginBottom: 5 }}
              color="secondary"
              onChange={(e) => handlePortionChange(e)}
              value={portions}
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
            <Select value={category} onChange={(e) => handleCategoryChange(e)}>
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
            {typeof image.name === "undefined" ? (
              <Button
                sx={{ paddingY: 1.8, marginY: 2 }}
                color="secondary"
                variant="outlined"
                component="span"
              >
                Lisää kuva
              </Button>
            ) : (
              <Box sx={{ textAlign: "center", maxWidth: 100 }}>
                <Typography sx={{ fontSize: 12 }}>{image.name}</Typography>
                <Typography sx={{ fontSize: 10 }}>Change</Typography>
              </Box>
            )}
          </InputLabel>
        </Box>
        <Button
          sx={{ paddingY: 1.8 }}
          color="secondary"
          variant="contained"
          onClick={handleSubmit}
        >
          Tallenna
        </Button>
      </Paper>
    </Box>
  );
}

export default AddRecipe;
