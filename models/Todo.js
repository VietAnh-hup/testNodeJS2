const mongoose = require("mongoose");


const Todo = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    status: Number
},
{timestamps: true}
)

module.exports = mongoose.model("Todo", Todo)