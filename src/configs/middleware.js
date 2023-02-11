const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  try {
    jwt.verify(token, "eyJ1c2VybmFtZSI6ImFkbWluIn0");
    next();
  } catch (e) {
    return res.status(401).json("Unauthorize!");
  }
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
