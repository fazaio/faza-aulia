const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, "eyJ1c2VybmFtZSI6ImFkbWluIn0", (err) => {
    if (err) return res.status(401).json("Unauthorize!");
    next();
  });
};

const generateToken = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id: payload }, "eyJ1c2VybmFtZSI6ImFkbWluIn0", (err, res) => {
      if (err) reject();
      resolve(res);
    });
  });
};

module.exports = { isAuth, generateToken };
