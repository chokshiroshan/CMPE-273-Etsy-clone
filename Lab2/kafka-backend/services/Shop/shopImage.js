const users = require("../../models/Users");

function handle_request(msg, callback) {
  console.log("Inside Kafka Backend Login");
  console.log("Message: ", msg);
  const shop = msg.shop;

  const image = "http://localhost:3001/images/shops/" + shop + ".jpeg";

  if (shop) {
    users.updateOne(
      { shop: shop },
      { $set: { shopimage: image } },
      function (err) {
        if (err) {
          console.log("Shop Image not Updated");
          callback(null, "UNSUCCESS");
        } else {
          console.log("Shop Image Updated");
          callback(null, "SUCCESS");
        }
      }
    );
  } else {
    callback(null, "Please enter Username and Password!");
  }
}

exports.handle_request = handle_request;
