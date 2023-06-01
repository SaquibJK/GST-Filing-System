const jwt = require("jsonwebtoken");

module.exports = {
  generateTokens: async (user) => {
    try {
      const payload = { _id: user._id, roles: user.roles };
      const access_secret = process.env.ACCESS_TOKEN_SECRET;
      const refresh_secret = process.env.REFRESH_TOKEN_SECRET;
      const accessToken = jwt.sign(payload, access_secret, {
        expiresIn: "30m",
      });
      const refreshToken = jwt.sign(payload, refresh_secret, {
        expiresIn: "30d",
      });

      return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
      return Promise.reject(error);
    }
  },
};