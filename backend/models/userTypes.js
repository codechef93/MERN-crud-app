const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userType = new Schema(
  {
    userType: { type: String },
    labInput: { type: Boolean },
    labAnalysis: { type: Boolean },
    labAdmin: { type: Boolean },
    stockUser: { type: Boolean },
    stockAdmin: { type: Boolean },
    hsImport: { type: Boolean },
    hsExport: { type: Boolean },
    hsAdmin: { type: Boolean },
    geologyImport: { type: Boolean },
    geologyExport: { type: Boolean },
    geologyAdmin: { type: Boolean },
    remark: { type: String }
  },
  { collection: "userTypes" }
);

module.exports = mongoose.model("userTypes", userType);