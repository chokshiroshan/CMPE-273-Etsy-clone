const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "lab",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("db connected!");
});

app.get("/login", (req, res) => {
  let sql = "SELECT username, password FROM users";
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result[0]);
  });
});

app.listen("3001", () => {
  console.log("hey");
});
