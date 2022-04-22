"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { auth } = require("../utils/passport");
const { checkAuth } = require("../utils/passport");
const users = require("../models/Users");
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req);
    if (req.path == "/userupdate") {
      cb(null, "./public/images/users");
    } else if (req.path == "/shopimage") {
      cb(null, "./public/images/shops");
    } else {
      cb(null, "./public/images/items");
    }
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    console.log(file);
    cb(null, file.fieldname + ".jpeg");
  },
});

const upload = multer({ storage: fileStorageEngine });
auth();

router.get("/getuserdata", function (request, response) {
  let user = request.query.user;
  console.log("user: " + user);

  users.find({ username: user }, function (err, user) {
    if (err) {
      throw err;
    } else {
      response.json(user);
    }
  });
});

router.post("/userupdate", upload.single("file"), function (request, response) {
  let username = request.body.username;
  image = "public/images/users/" + username + ".jpeg";
  fs.rename("public/images/users/file.jpeg", image, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File Renamed.");
  });
  // console.log(file);
  image = "http://localhost:3001/images/users/" + username + ".jpeg";
  if (username) {
    users.updateOne(
      { username: username },
      {
        $set: {
          image: image,
          name: request.body.name,
          email: request.body.email,
          phone: request.body.phone,
          gender: request.body.gender,
          birthday: request.body.birthday,
          address: request.body.address,
          city: request.body.city,
          country: request.body.country,
        },
      },
      function (err, user) {
        if (err) {
          response.end("UNSUCCESS");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("User Updated");
          response.end("SUCCESS");
        }
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

module.exports = router;
