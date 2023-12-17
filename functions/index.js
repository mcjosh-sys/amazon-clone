const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// API

// - App config
const app = express();

// - Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (req, res)=>res.status(200).send("Hello World"));
app.post("/payments/create", async (req, res)=> {
  // eslint-disable-next-line no-trailing-spaces
  const total = req.query.total; 
  console.log("Payment request received for this total amount >>>", total );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  return res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen
exports.api = onRequest(app);
