const { generateTokens } = require("../utils/generateTokens");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../utils/validationSchema");
const User = require("../models/users");
const { verifyRefreshToken } = require("../utils/verifyRefreshToken");

const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.render("Register", { errorMessage });
  }

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Email Already Exists, Try Logging In");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    email: req.body.email,
    password: hashedPassword,
    roles: req.body.roles,
  });

  try {
    const savedUser = await newUser.save();
    res.redirect("/login");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    const errorMessage = "Invalid Password or Email";
    return res.render("Login", { errorMessage });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const errorMessage = "Invalid Email or Password";
    return res.render("Login", { errorMessage });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    const errorMessage = "Email or Password is wrong";
    return res.render("Login", { errorMessage });
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  res.cookie("auth-token", accessToken, { httpOnly: true });
  res.redirect("/user/upload");
};

const refreshToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(400).send("Please Provide Refresh Token");
  }

  try {
    const tokenDetails = await verifyRefreshToken(refreshToken);
    const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    res.status(200).json({
      accessToken,
      message: "Access Token created Successfully",
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};