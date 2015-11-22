const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let client = new Schema(
  {
    name: { type: String },
    clientId: { type: String },
    other: { type: String },
    countryL: { type: String },
    countryB: { type: String },
    zipCodeL: { type: String },
    zipCodeB: { type: String },
    cityL: { type: String },
    cityB: { type: String },
    addressL: { type: String },
    address2L: { type: String },
    addressB: { type: String },
    address2B: { type: String },
    email: { type: String },
    email2: { type: String },
    email3: { type: String },
    remark1: { type: String },
    remark2: { type: String }
  },
  { collection: "clients" }
);

module.exports = mongoose.model("clients", client);