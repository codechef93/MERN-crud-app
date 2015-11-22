const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let unit = new Schema(
  {
    unit: { type: String },
    remark: { type: String }
  },
  { collection: "units" }
);

module.exports = mongoose.model("units", unit);