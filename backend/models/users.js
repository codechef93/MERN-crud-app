const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let user = new Schema(
  {
    userName: { type: String },
    email: { type: String },
    password: { type: String },
    userType: { type: String },
    remark: { type: String }
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", user);