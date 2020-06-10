const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const stripe = require("stripe")("token");
const uuid = require("uuid/v4");
const cors = require("cors");
require("dotenv/config");
////metod///
const app = express();

//import route
const postRoute = require("./route/post");
const authRoute = require("./route/auth");
//use
app.use(cors());
app.use(bodyParse.json());
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);
///api get
app.get("/", function(req, res, error) {
  res.send("add you stripe secret key to the .require('stripe) statement");
  console.log("work");
  if (error) {
    console.error(error);
    throw error;
  }
  console.log("work");
});
//stripe
app.post("/pay", async (req, res) => {
  console.log("request", req.body);
  let error;
  let status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customer.create({
      email: token.email,
      source: token.id
    });
    const idempotency_key = uuid();
    const charge = await stripe.charge.create(
      {
        amount: product.price * 100,
        currency: "usd",
        receipt_email: token.email,
        description: `purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address,
            country: token.card.addressCountry,
            postal_code: token.card.addresszip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("error:", error);
    status = "failure";
  }
  res.json({ error, status });
});

//connect to db
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(
  "mongodb://adminTuna:tuna88@cluster0-shard-00-00-xqlw5.mongodb.net:27017,cluster0-shard-00-01-xqlw5.mongodb.net:27017,cluster0-shard-00-02-xqlw5.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
  dbOptions,
  function(error) {
    if (error) {
      console.error(error);
      throw error;
    }
    console.log("connect to the db");
  }
);

//listeng server
app.listen(3000, () => {
  console.log("Server runnning");
});
