require("dotenv").config();
const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports = {
  verifyRefreshToken: (refreshToken) => {
    const refreshPrivateToken = process.env.REFRESH_TOKEN_SECRET;

    return new Promise((resolve, reject) => {
      if (!refreshToken) {
          return reject({ error: true, message: "Invalid refresh token" });
        }
        jwt.verify(refreshToken, refreshPrivateToken, (err, tokenDetails) => {
            if (err) {
                return reject({ error: true, message: "Invalid refresh token" });
            }
            resolve({
                tokenDetails,
                error: false,
                message: "Valid refresh token"
            })
        })
    });
  },
};
