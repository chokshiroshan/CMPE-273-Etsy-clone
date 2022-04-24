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

  i.map((item) => {
    // console.log("purchsed item: ", item);
    items.findById(item._id, (err, row) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(row);
        cart.find({ user: request.body.user, id: item._id }, (err, r) => {
          if (err) {
            console.log(err);
          } else {
            console.log("cart item: ", r[0].gift);
            purchased.create(
              {
                id: item._id,
                user: request.body.user,
                quantity: item.quantity,
                name: row.name,
                price: row.price,
                image: row.image,
                shop: row.shop,
                category: row.category,
                description: row.description,
                gift: r[0].gift,
                giftDescription: r[0].giftDescription,
              },
              function (err) {
                if (err) {
                  console.log(err);
                  response.end("UNSUCCESS");
                } else {
                  console.log("Item Created");
                  // response.end("SUCCESS");
                  i.map((item) => {
                    cart.deleteOne(
                      { id: item._id, user: request.body.user },
                      function (err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("Item Deleted");
                        }
                      }
                    );
                  });
                }
              }
            );
          }
        });
      }
    });
    response.end("SUCCESS");
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
  purchased.find({ user: request.query.user }, function (err, items) {
    if (err) {
      console.log(err);
      response.end("UNSUCCESS");
    } else {
      response.json(items);
    }
  });
});

module.exports = router;
