const jwt = require("jsonwebtoken");
const verifyRefreshToken = require("../utils/verifyRefreshToken");

const auth = (req, res, next) => {
  const token = req.header("auth-token") || req.cookies["auth-token"];
  if (!token) return res.status(403).json("Access Denied: No Token Provided");

  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).send("Invalid Token");
  }
};

module.exports = auth;