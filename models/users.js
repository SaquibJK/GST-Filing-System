const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"]
  }
},{timestamps: true});

const User = new mongoose.model("User", UserSchema);

module.exports = User;