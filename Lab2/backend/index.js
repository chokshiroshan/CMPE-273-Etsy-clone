const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const users = require("./models/Users");
const items = require("./models/Items");
const favourites = require("./models/Favourites");
const cart = require("./models/Cart");
const purchased = require("./models/Purchased");

require("dotenv").config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

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

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(bodyParser.json());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (request, response) => {
  // Capture the input fields
  console.log("In Login");
  let username = request.body.username;
  let password = request.body.password;
  console.log(request.body);
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    const user = await users.find({ username: username, password: password });
    if (user.length > 0) {
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });
      response.end("SUCCESS");
    } else {
      response.end("UNSUCCESS");
    }
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.post("/register", function (request, response) {
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

app.get("/getuserdata", function (request, response) {
  let user = request.query.user;
  console.log(user);

  users.find({ username: user }, function (err, user) {
    if (err) {
      throw err;
    } else {
      response.json(user);
    }
  });
});

app.post("/userupdate", upload.single("file"), function (request, response) {
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

app.post("/checkshop", function (request, response) {
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

app.post("/shopimage", upload.single("file"), function (request, response) {
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

app.post("/additem", upload.single("file"), function (request, response) {
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

app.post("/edititem", upload.single("file"), function (request, response) {
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

app.delete("/deleteitem", function (req, res) {
  console.log(req.body);

  items.deleteOne({ _id: req.body.id }, function (err) {
    if (err) {
      console.log("Item not Deleted");
    } else {
      console.log("Item Deleted");
    }
  });
});

app.get("/getitems", function (request, response) {
  let shop = request.query.shop;

  items.find({ shop: shop }, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      response.json(items);
    }
  });
});

app.get("/getshopowner", function (request, response) {
  let shop = request.query.shop;

  users.find({ shop: shop }, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      response.json(users);
    }
  });
});

app.get("/getallitems", function (request, response) {
  items.find({}, function (err, items) {
    if (err) {
      console.log(err);
    } else {
      response.json(items);
    }
  });
});

app.post("/addfavourites", function (request, response) {
  // Capture the input fields
  console.log(request.body);
  favourites.create(
    { id: request.body.id, user: request.body.user },
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
});

app.delete("/removefavourite", function (req, res) {
  console.log(req.body);

  favourites.deleteOne(
    { id: req.body.id, username: req.body.username },
    function (err) {
      if (err) {
        console.log("Item not Deleted");
        res.end("UNSUCCESS");
      } else {
        console.log("Item Deleted");
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end("SUCCESS");
      }
    }
  );
});

app.get("/getfavourites", function (request, response) {
  // Capture the input fields
  console.log(request.query);

  favourites.find({ user: request.query.user }, async (err, rows) => {
    if (err) {
      console.log(err);
      response.end("EMPTY");
    } else {
      let array = [];
      // console.log("rows: " + rows);
      rows.map((row) => array.push(row.id));
      // console.log("array: " + array);
      if (array.length > 0) {
        items.find({ _id: { $in: array } }, function (err, items) {
          if (err) {
            // console.log(err);
            response.end("EMPTY");
          } else {
            // console.log("items: " + items);
            response.json(items);
          }
        });
      } else {
        response.end("EMPTY");
      }
    }
  });
});

app.get("/getsearchitems", function (request, response) {
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

app.post("/addcart", function (request, response) {
  // Capture the input fields
  console.log(request.body);

  cart.create(
    {
      id: request.body.id,
      user: request.body.user,
      quantity: request.body.quantity,
    },
    function (err) {
      if (err) {
        console.log(err);
        response.end("UNSUCCESS");
      } else {
        items.updateOne(
          { _id: request.body.id },
          { $set: { quantity: request.body.rquantity } },
          function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log("Item Updated");
            }
          }
        );
        response.writeHead(200, {
          "Content-Type": "text/plain",
        });
        console.log("Item Created");
        response.end("SUCCESS");
      }
    }
  );
});

app.get("/getcart", function (request, response) {
  // Capture the input fields
  // console.log(request.query);

  cart.find({ user: request.query.user }, function (err, rows) {
    if (err) {
      console.log(err);
      response.end("EMPTY");
    } else {
      let array = [];
      let q = [];
      rows.map((row) => array.push(row.id));
      rows.map((row) => q.push(row.quantity));
      if (array.length > 0) {
        items.find({ _id: { $in: array } }, function (err, items) {
          if (err) {
            console.log(err);
          } else {
            items.map((item, index) => (item.quantity = q[index]));
            // console.log("items: " + items);
            response.json(items);
          }
        });
      }
    }
  });
});

app.delete("/deletecartitem", function (req, res) {
  console.log(req.body);
  cart.deleteOne({ id: req.body.id, user: req.body.user }, function (err) {
    if (err) {
      console.log(err);
    } else {
      items.updateOne(
        { _id: req.body.id },
        { $inc: { quantity: req.body.quantity } },
        function (err) {
          console.log(err);
          console.log("Item Deleted");
          res.writeHead(200, {
            "Content-Type": "text/plain",
          });
          res.end("SUCCESS");
        }
      );
    }
  });
});

app.get("/getcarttotal", function (request, response) {
  // Capture the input fields
  // console.log(request.query);

  cart.find({ user: request.query.user }, function (err, rows) {
    if (err) {
      console.log(err);
      response.end("EMPTY");
    } else {
      let array = [];
      let quantity = [];
      rows.map((row) => array.push(row.id));
      rows.map((row) => quantity.push(row.quantity));
      if (array.length > 0) {
        items.find({ _id: { $in: array } }, function (err, items) {
          if (err) {
            console.log(err);
          } else {
            let q = 0;
            items.map((item, index) => (q = item.price * quantity[index] + q));
            // console.log("items: " + items);
            response.json(q);
          }
        });
      }
    }
  });
});

app.post("/addpurchased", function (request, response) {
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

app.get("/getpurchased", function (request, response) {
  // Capture the input fields
  purchased.find({ user: request.query.user }, function (err, rows) {
    if (err) {
      console.log(err);
      response.end("EMPTY");
    } else {
      let array = [];
      rows.map((row) => array.push(row.id));
      if (array.length > 0) {
        items.find({ _id: { $in: array } }, function (err, items) {
          if (err) {
            console.log(err);
          } else {
            // console.log("items: " + items);
            response.json(items);
          }
        });
      }
    }
  });
});

app.listen("3001", () => {});
