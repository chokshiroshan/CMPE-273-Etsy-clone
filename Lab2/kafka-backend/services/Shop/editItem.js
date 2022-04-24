const users = require("../../models/Users");
const items = require("../../models/Items");

function handle_request(msg, callback) {
  console.log("Inside Kafka Backend Login");
  console.log("Message: ", msg);

  image = "http://localhost:3001/images/items/" + msg.name + ".jpeg";

  items.updateOne(
    { $and: [{ _id: msg.id }, { shop: msg.shop }] },
    {
      $set: {
        image: image,
        name: msg.name,
        category: msg.category,
        price: msg.price,
        description: msg.description,
        quantity: msg.quantity,
        shop: msg.shop,
      },
    },
    function (err) {
      if (err) {
        console.log("Item Image not Updated");
        callback(null, "UNSUCCESS");
      } else {
        console.log("Item Image Updated");
        callback(null, "SUCCESS");
      }
    }
  );
}

exports.handle_request = handle_request;
