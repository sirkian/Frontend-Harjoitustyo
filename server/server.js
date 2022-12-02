const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const sqlite3 = require("sqlite3");
const multer = require("multer");

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ limit: "5mb", extended: true }));

const db = new sqlite3.Database("recipes.db");
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./img");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.listen(8080, () => {
  console.log("Server running on port 8080!");
});

app.get("/recipes/all", (req, res) => {
  db.all("SELECT * FROM recipe", (error, result) => {
    if (error) throw error;
    return res.status(200).json(result);
  });
});

app.get("/recipes/:id", (req, res) => {
  let id = req.params.id;
  db.get("SELECT * FROM recipe WHERE id = ?", [id], (error, result) => {
    if (error) throw error;
    if (typeof result === "undefined") {
      return res.status(200).json({});
    }
    return res.status(200).json(result);
  });
});

app.post("/recipes/add", upload.single("image"), (req, res) => {
  let file = req.body;
  let fileName = null;
  if (req.file) {
    fileName = req.file.originalname;
  }
  db.run(
    "INSERT INTO recipe (name, time, portions, description, instructions, image, category, incredients, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      file.name,
      file.time,
      file.portions,
      file.description,
      file.instructions,
      fileName,
      file.category,
      file.incredients,
      file.date,
    ],
    (error, result) => {
      if (error) throw error;
      return res.status(200).json({ count: 1 });
    }
  );
});

app.post("/recipes/edit/", upload.single("image"), (req, res) => {
  let file = req.body;
  let fileName = null;
  if (req.file) {
    fileName = req.file.originalname;
  }
  db.run(
    "UPDATE recipe SET name = ?, time = ?, portions = ?, description = ?, instructions = ?, image = ?, category = ?, incredients = ?, date = ? WHERE id = ?",
    [
      file.name,
      file.time,
      file.portions,
      file.description,
      file.instructions,
      fileName === null ? file.image : fileName,
      file.category,
      file.incredients,
      file.date,
      file.id,
    ],
    (error, result) => {
      if (error) throw error;
      return res.status(200).json({ count: 1 });
    }
  );
});

app.get("/recipes/delete/:id", (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM recipe WHERE id = ?", [id], function (error, result) {
    if (error) throw error;
    return res.status(200).json({ count: this.changes });
  });
});

app.get("/recipes/download/:name", (req, res) => {
  let file = "./img/" + req.params.name;
  res.download(file);
});

app.get("*", (req, res) => {
  return res.status(404).json({ error: true, message: "Service not found." });
});
