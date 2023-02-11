const express = require("express");
const cors = require("cors");
const users = require("./src/router/users");
const DB = require("./src/configs/db");
const REDIS = require("./src/configs/redis");

const app = express();
const bodyParser = require("body-parser");
DB.connectToDB(); // mongoDB connection
REDIS.connectToServer(); // Redis Connection

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users); // user router

app.get("/", (req, res) => {
  res.send(
    "<br> Please visit this link : https://github.com/fazaio/faza-aulia/tree/main <br><br> To see REST-API documentation."
  );
});

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`);
});
