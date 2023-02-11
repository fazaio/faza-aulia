const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    accountNumber: String,
    emailAddress: String,
    identityNumber: String,
  },
  {
    timestamps: true,
  }
);

mongoose.set("strictQuery", false);
const Users = mongoose.model("Users", userSchema);

module.exports = Users;
