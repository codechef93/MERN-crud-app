const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let objective = new Schema(
  {
    objective: { type: String },
    units: { type: Array },
    remark: { type: String }
  },
  { collection: "objectives" }
);

module.exports = mongoose.model("objectives", objective);