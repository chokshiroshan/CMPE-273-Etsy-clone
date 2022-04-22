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
const cart = require("../models/Cart");
const purchased = require("../models/Purchased");

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

router.post("/addpurchased", function (request, response) {
  const i = request.body.items;
  console.log(request.body);
  i.map((item) => {
    purchased.create(
      {
        id: item._id,
        user: request.body.user,
        quantity: item.quantity,
      },
      function (err) {
        if (err) {
          console.log(err);
          response.end("UNSUCCESS");
        } else {
          console.log("Item Created");
          response.end("SUCCESS");
        }
      }
    );
  });
  i.map((item) => {
    cart.deleteOne({ id: item._id, user: request.body.user }, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Item Deleted");
      }
    });
  });
  i.map((item) => {
    items.updateOne(
      { _id: item._id },
      { $inc: { sold: item.quantity } },
      function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Item Updated");
        }
      }
    );
  });
});

router.get("/getpurchased", function (request, response) {
  console.log("in /getpurchased");

  // Capture the input fields
  purchased.find({ user: request.query.user }, function (err, rows) {
    if (err) {
      console.log(err);
      response.end("EMPTY");
    } else {
      let array = [];
      let q = [];
      rows.map((row) => {
        array.push(row.id);
        q.push(row.quantity);
      });
      console.log(q);
      if (array.length > 0) {
        items.find({ _id: { $in: array } }, function (err, items) {
          if (err) {
            console.log(err);
          } else {
            // console.log("items: " + items);
            items.map((item, index) => (item.quantity = q[index]));
            // console.log("items after changing: " + items);

            response.json(items);
          }
        });
      }
    }
  });
});

module.exports = router;
