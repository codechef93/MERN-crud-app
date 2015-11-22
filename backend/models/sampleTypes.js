const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let sampleType = new Schema(
  {
    sampleType: { type: String },
    material: { type: Boolean },
    client: { type: Boolean },
    packingType: { type: Boolean },
    dueDate: { type: Boolean },
    sampleDate: { type: Boolean },
    sendingDate: { type: Boolean },
    analysisType: { type: Boolean },
    incomingProduct: { type: Boolean },
    distributor: { type: Boolean },
    certificateType: { type: Boolean },
    remark: { type: String }
  },
  { collection: "sampleTypes" }
);

module.exports = mongoose.model("sampleTypes", sampleType);