const authRouter = require("express").Router();
const { registerUser, loginUser,refreshToken  } = require("../controllers/authController");

// Register User
authRouter.post("/register", registerUser);

//  Login User
authRouter.post("/login", loginUser);

// Refresh Tokens (i.e Get new Access token)
authRouter.post("/refresh-token", refreshToken);

module.exports = authRouter;