const mongoose = require("mongoose");

const purchased = mongoose.Schema(
  {
    id: { type: String, default: null },
    user: { type: String, default: null },
    quantity: { type: Number, default: null },
  },
  { collection: "purchased" }
);

module.exports = mongoose.model("Purchased", purchased);
