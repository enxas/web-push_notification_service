const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');

const subscriptionRoutes = require("./routes/subscribe");

mongoose.connect('mongodb://user:password@localhost:27017/web-push?authSource=admin');
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  // browser sends OPTIONS request first when sends PUT or POST request to see what requests it can send to the REST api
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.static('public'))

app.use("/", subscriptionRoutes);

// trow error if none of the above routes gets handled
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// catch and return error if it happens at any part of the aplication
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

app.listen(3001, 'localhost');