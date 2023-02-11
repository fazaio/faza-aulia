const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  try {
    // Validate the header request (authorization header) (Point 5)
    if (authHeader.split(" ")[0] !== "Bearer")
      throw "Invalid token, use Bearer instead!";
    // --

    jwt.verify(token, "eyJ1c2VybmFtZSI6ImFkbWluIn0");
    next();
  } catch (e) {
    let err = e ? e : "Unauthorize!";
    return res.status(401).json(err);
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
