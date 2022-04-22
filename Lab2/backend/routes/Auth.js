"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { auth } = require("../utils/passport");
const Users = require("../models/Users");
auth();

//Route to handle Post Request Call
router.post("/login", async (req, res) => {
  // Capture the input fields
  console.log("In Login");
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);

  Users.findOne(
    { username: req.body.username, password: req.body.password },
    (error, user) => {
      if (error) {
        res.status(500).end("Error Occured");
      }
      if (user) {
        const payload = { _id: user._id, username: user.username };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).end("SUCCESS " + "JWT " + token);
      } else {
        res.status(401).end("UNSUCCESS");
      }
    }
  );
});

router.post("/register", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let email = request.body.email;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    users.find({ username: username }, function (err, user) {
      if (user.length > 0) {
        console.log("User not Created");
        response.end("UNSUCCESS");
      } else {
        users.create({
          username: username,
          email: email,
          password: password,
        });
        console.log("User Created");
        response.end("SUCCESS");
      }
    });
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

module.exports = router;
