const mongoose = require("mongoose");

const GridDataSchema = new mongoose.Schema({
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GridData", GridDataSchema);
