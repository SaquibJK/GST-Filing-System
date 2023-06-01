require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const port = process.env.PORT || 4000;
const userRouter = require("./routes/user");
const authRoutes = require("./routes/auth")
const adminRoutes = require("./routes/admin")
const { connect } = require("./functions/functions");
const cookieParser = require("cookie-parser");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// DB connection
connect();

app.listen(port, (req, res) => {
  console.log(`Server is Live, http://localhost:${port}`);
});

app.use(userRouter);
app.use("/auth",authRoutes);
app.use("/admin",adminRoutes);