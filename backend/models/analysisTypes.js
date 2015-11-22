const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let analysisType = new Schema(
  {
    analysisType: { type: String },
    labType: { type: Number },
    objectives: { type: Array },
    remark: { type: String }
  },
  { collection: "analysisTypes" }
);

module.exports = mongoose.model("analysisTypes", analysisType);