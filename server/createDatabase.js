const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("recipes.db");

db.serialize(() => {
  let sql =
    "CREATE TABLE recipe (" +
    "id integer PRIMARY KEY NOT NULL, " +
    "name text NOT NULL, " +
    "time text,  " +
    "portions text, " +
    "description text, " +
    "instructions text NOT NULL, " +
    "image text, " +
    "category text, " +
    "incredients text NOT NULL, " +
    "date date, " +
    "userName text NOT NULL, " +
    "userId text NOT NULL )";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Table recipe created!");
  });

  sql =
    "CREATE TABLE liked (" +
    "id integer PRIMARY KEY NOT NULL, " +
    "recipeId integer NOT NULL, " +
    "userId text NOT NULL )";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Table liked created!");
  });

  sql =
    "CREATE TABLE categories (" +
    "id integer PRIMARY KEY NOT NULL, " +
    "category text NOT NULL )";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Table categories created!");
  });

  sql =
    "INSERT INTO categories (category) VALUES " +
    "('Pastat'), " +
    "('Tex-Mex'), " +
    "('Itämaiset'), " +
    "('Keitot'), " +
    "('Salaatit'), " +
    "('Kastikkeet'), " +
    "('Grilliruoat'), " +
    "('Jälkiruoat')";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Categories added!");
    console.log("Database created succesfully!");
  });

  db.close();
});
