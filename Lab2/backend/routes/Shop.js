"use strict";
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../utils/config");
const { auth } = require("../utils/passport");
const { checkAuth } = require("../utils/passport");
const fs = require("fs");
const users = require("../models/Users");
const items = require("../models/Items");

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
let image;
auth();

router.post("/checkshop", function (request, response) {
  let shop = request.body.shop;
  let username = request.body.username;

  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (shop) {
    // Execute SQL query that'll select the account from the database based on the specified username and password

    users.updateOne(
      { username: username },
      { $set: { shop: shop } },
      function (err) {
        if (err) {
          console.log("Shop not Created");

          response.end("UNSUCCESS");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          // Redirect to home page
          console.log("Shop Created");
          response.end("SUCCESS");
        }
      }
    );
  } else {
    response.send("Please enter Shop name!");
    response.end();
  }
});

router.post("/shopimage", upload.single("file"), function (request, response) {
  // Capture the input fields
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  image = "public/images/shops/" + request.body.shop + ".jpeg";
  fs.rename("public/images/shops/file.jpeg", image, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File Renamed.");
  });
  // console.log(file);
  image = "http://localhost:3001/images/shops/" + request.body.shop + ".jpeg";
  // Execute SQL query that'll select the account from the database based on the specified username and password
  if (request.body.shop) {
    users.updateOne(
      { shop: request.body.shop },
      { $set: { shopimage: image } },
      function (err) {
        if (err) {
          console.log("Shop Image not Updated");
          response.end("UNSUCCESS");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          console.log("Shop Image Updated");
          response.end("SUCCESS");
        }
      }
    );
  } else {
    response.send("Please enter Shop name!");
    response.end();
  }
});

router.post("/additem", upload.single("file"), function (request, response) {
  // Capture the input fields
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  image = "public/images/items/" + request.body.name + ".jpeg";
  fs.rename("public/images/items/file.jpeg", image, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File Renamed.");
  });
  // console.log(file);
  image = "http://localhost:3001/images/items/" + request.body.name + ".jpeg";
  // Execute SQL query that'll select the account from the database based on the specified username and password
  if (request.body.name) {
    items.create(
      {
        image: image,
        name: request.body.name,
        category: request.body.category,
        price: request.body.price,
        description: request.body.description,
        quantity: request.body.quantity,
        shop: request.body.shop,
      },
      function (err, item) {
        if (err) {
          console.log(err);
          response.end("UNSUCCESS");
        } else {
          response.writeHead(200, {
            "Content-Type": "text/plain",
          });
          console.log("Item Created");
          response.end("SUCCESS");
        }
      }
    );
  } else {
    response.send("Please enter Item name!");
    response.end();
  }
});

router.post("/edititem", upload.single("file"), function (request, response) {
  // Capture the input fields
  console.log("body: ", request.body);
  image = "http://localhost:3001/images/items/" + request.body.name + ".jpeg";
  fs.rename("public/images/items/file.jpeg", image, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("File Renamed.");
  });

  items.updateOne(
    { $and: [{ _id: request.body.id }, { shop: request.body.shop }] },
    {
      $set: {
        image: image,
        name: request.body.name,
        category: request.body.category,
        price: request.body.price,
        description: request.body.description,
        quantity: request.body.quantity,
        shop: request.body.shop,
      },
    },
    function (err) {
      if (err) {
        console.log("Item Image not Updated");
        response.end("UNSUCCESS");
      } else {
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        console.log("Item Image Updated");
        response.end("SUCCESS");
      }
    }
  );
});

router.delete("/deleteitem", function (req, res) {
  console.log(req.body);

  items.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log("Item not Deleted");
    } else {
      console.log("Item Deleted");
    }
  });
});

router.get("/getitems", function (request, response) {
  let shop = request.query.shop;

  items.find({ shop: shop }, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      response.json(items);
    }
  });
});

router.get("/getshopowner", function (request, response) {
  let shop = request.query.shop;

  users.find({ shop: shop }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      response.json(users);
    }
  });
});

module.exports = router;
