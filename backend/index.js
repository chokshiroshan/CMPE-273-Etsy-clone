const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "lab",
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(fileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json());

db.connect((err) => {
  if (err) {
    throw err;
  }
});

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("Correct");
          response.end("SUCCESS");
        } else {
          console.log("Incorrect");

          response.end("UNSUCCESS");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/register", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "INSERT INTO `users`(`username`, `password`) VALUES (?,?)",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error

        console.log(results);
        // If the account exists
        if (error) {
          if (error.errno == 1062) {
            console.log("User not Created");

            response.end("UNSUCCESS");
          }
        }

        if (results) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("User Created");
          response.end("SUCCESS");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/getuserdata", function (request, response) {
  let user = request.query.user;
  console.log(user);
  db.query(
    "SELECT * FROM `users` WHERE `username` = ?",
    [user],
    function (err, rows, fields) {
      if (err) {
        throw err;
      } else {
        response.json(rows);
      }
    }
  );
});

app.post("/userupdate", function (request, response) {
  let username = request.body.username;
  console.log(request.body);

  if (username) {
    db.query(
      "UPDATE `users` SET `name`=?,`email`=?,`phone`=?,`gender`=?,`birthday`=?,`address`=?,`city`=?,`country`=? WHERE `username` = ?",
      [
        request.body.name,
        request.body.email,
        request.body.phone,
        request.body.gender,
        request.body.birthday,
        request.body.address,
        request.body.city,
        request.body.country,
        username,
      ],
      function (error, results, fields) {
        // If there is an issue with the query, output the error

        console.log(results);

        if (results) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("User Updates");
          response.end("SUCCESS");
        }
        response.end("UNSUCCESS");
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/checkshop", function (request, response) {
  let shop = request.body.shop;
  let username = request.body.username;

  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (shop) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "UPDATE `users` SET `shop`=? WHERE `username` = ?",
      [shop, username],
      function (error, results, fields) {
        // If there is an issue with the query, output the error

        console.log(results);
        // If the account exists
        if (error) {
          if (error.errno == 1062) {
            console.log("User not Created");

            response.end("UNSUCCESS");
          }
        }

        if (results) {
          // Authenticate the user
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("User Created");
          response.end("SUCCESS");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Shop name!");
    response.end();
  }
});

app.listen("3001", () => {});
