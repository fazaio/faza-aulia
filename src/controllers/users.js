const USERS = require("../model/user.model");
const middleware = require("../configs/middleware");
const redisUsers = require("../utilities/redisUsers");

const GENERATE_TOKEN = async (req, res) => {
  try {
    let data = {};
    data.username = "admin";
    data.password = "root";

    let token = await middleware.generateToken(data);
    res.send(token);
  } catch (e) {
    res.status(401).send("failed generate token!");
  }
};

const READS_USERS = async (req, res) => {
  try {
    let result = await USERS.find();

    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
};

const CREATES_USERS = async (req, res) => {
  try {
    const users = new USERS({
      userName: req.body.userName,
      accountNumber: req.body.accountNumber,
      emailAddress: req.body.emailAddress,
      identityNumber: req.body.identityNumber,
    });

    let result = await users.save();

    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
};

const UPDATE_USERS = async (req, res) => {
  try {
    if (!req.body) throw "Data update is required!";

    const id = req.params.id;

    let result = await USERS.findByIdAndUpdate(id, req.body);

    await redisUsers.deleteCacheUsers([
      id,
      result.accountNumber,
      result.identityNumber,
    ]); // Delete cache

    res.send(result);
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

const DELETE_USERS = async (req, res) => {
  try {
    if (!req.body) throw new Error(false);

    const id = req.params.id;

    let result = await USERS.findByIdAndDelete(id);

    await redisUsers.deleteCacheUsers([
      id,
      result.accountNumber,
      result.identityNumber,
    ]); // Delete cache

    res.send(result);
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

const DETAIL_USERS = async (req, res) => {
  try {
    const type = req.params.typenumber;
    const id = req.params.id;

    let query = {};
    let result = false;
    type == "accountNumber"
      ? (query.accountNumber = id)
      : type == "identityNumber"
      ? (query.identityNumber = id)
      : (type = false);

    if (!type) throw "Invalid Params!";

    // Redis cache!
    if (await redisUsers.isCacheAvail(id)) {
      console.log("load from cache");
      result = await redisUsers.getValueUsers(id);

      res.send(result);
    } else {
      console.log("load from db");

      result = await USERS.findOne(query).exec();
      await redisUsers.setValueUsers(id, JSON.stringify(result));

      res.send(result);
    }
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

module.exports = {
  READS_USERS,
  CREATES_USERS,
  UPDATE_USERS,
  DELETE_USERS,
  GENERATE_TOKEN,
  DETAIL_USERS,
};
