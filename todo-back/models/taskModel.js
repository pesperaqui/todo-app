const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: String,
    description: String,
    complete: Boolean
  },

  {
    collection: "tasks",
  }
);

module.exports = mongoose.model("Task", TaskSchema);
