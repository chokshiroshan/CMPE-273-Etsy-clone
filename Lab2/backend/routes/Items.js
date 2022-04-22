"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { auth } = require("../utils/passport");
const { checkAuth } = require("../utils/passport");
const users = require("../models/Users");
const items = require("../models/Items");
const favourites = require("../models/Favourites");

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

router.get("/getallitems", function (request, response) {
  items.find({}, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      response.json(items);
    }
  });
});

router.get("/getsearchitems", function (request, response) {
  console.log("request: ", request.query);
  const filter = request.query.filter;
  // const query = ;
  // console.log(query);
  if (filter) {
    if (filter == 1) {
      items.find(
        {
          $and: [
            { name: { $regex: request.query.keyword } },
            { price: { $lt: 50 } },
          ],
        },
        function (err, items) {
          if (err) {
            console.log(err);
          } else {
            response.json(items);
          }
        }
      );
    } else if (filter == 2) {
      items.find(
        {
          $and: [
            { name: { $regex: request.query.keyword } },
            { $and: [{ price: { $gt: 50 } }, { price: { $lt: 100 } }] },
          ],
        },
        function (err, items) {
          if (err) {
            console.log(err);
          } else {
            response.json(items);
          }
        }
      );
    } else {
      items.find(
        {
          $and: [
            { name: { $regex: request.query.keyword } },
            { price: { $gt: 100 } },
          ],
        },
        function (err, items) {
          if (err) {
            console.log(err);
          } else {
            response.json(items);
          }
        }
      );
    }
  } else {
    items.find(
      { name: { $regex: request.query.keyword } },
      function (err, items) {
        if (err) {
          console.log(err);
        } else {
          console.log("no filter");
          console.log(items);
          response.json(items);
        }
      }
    );
  }
});

module.exports = router;
