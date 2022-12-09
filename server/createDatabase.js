const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("recipes.db");

db.serialize(() => {
  let sql = "PRAGMA foreign_keys = ON;";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
  });

  sql =
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
    "userId text NOT NULL, " +
    "likes integer DEFAULT 0 NOT NULL );";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Table recipe created!");
  });

  sql =
    "CREATE TABLE liked (" +
    "liked_id integer PRIMARY KEY NOT NULL, " +
    "userId text NOT NULL, " +
    "recipeId integer, " +
    "FOREIGN KEY(recipeId) REFERENCES recipe(id) );";

  db.run(sql, (error) => {
    if (error) {
      return console.log(error.message);
    }
    console.log("Table liked created!");
  });

  db.close();
});
