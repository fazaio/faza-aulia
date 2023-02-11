const DB = require("../configs/db");
const USERS = require("../model/user.model");
const middleware = require("../configs/middleware");

const GENERATE_TOKEN = async (req, res) => {
  try {
    let data = {};
    data.username = "admin";
    data.password = "root";

    await DB.connectToDB();

    let token = await middleware.generateToken(data);
    res.send(token);
  } catch (e) {
    res.status(401).send("failed generate token!");
  }
};

const READS_USERS = async (req, res) => {
  try {
    await DB.connectToDB();
    let result = await USERS.find();

    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
};

const CREATES_USERS = async (req, res) => {
  try {
    await DB.connectToDB();

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
    await DB.connectToDB();
    if (!req.body) throw new Error("Data update is required!");

    const id = req.params.id;

    let result = await USERS.findByIdAndUpdate(id, req.body);

    res.send(result);
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

const DELETE_USERS = async (req, res) => {
  try {
    await DB.connectToDB();
    if (!req.body) throw new Error(false);

    const id = req.params.id;

    let result = await USERS.findByIdAndDelete(id);

    res.send(result);
  } catch (e) {
    let err = e ? e : "Bad Request";
    res.status(400).send(err);
  }
};

const DETAIL_USERS = async (req, res) => {
  try {
    await DB.connectToDB();
    const type = req.params.typenumber;
    const id = req.params.id;

    let query = {};
    type == "accountNumber"
      ? (query.accountNumber = id)
      : type == "identityNumber"
      ? (query.identityNumber = id)
      : (type = false);

    if (!type) throw new Error("Invalid Params!");
    let result = await USERS.findOne(query).exec();

    res.send(result);
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
