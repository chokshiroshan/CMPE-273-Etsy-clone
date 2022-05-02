const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const { checkAuth } = require("./utils/passport");
const users = require("./models/Users");
const items = require("./models/Items");
const favourites = require("./models/Favourites");
const cart = require("./models/Cart");
const purchased = require("./models/Purchased");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
