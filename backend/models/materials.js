const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let material = new Schema(
  {
    material: { type: String },
    objectiveValues: { type: Array },
    clients: { type: Array },
    remark: { type: String }
  },
  { collection: "materials" }
);

module.exports = mongoose.model("materials", material);