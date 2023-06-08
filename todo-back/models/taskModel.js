const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: String,
    description: String,
    completed: Boolean
  },

  {
    collection: "tasks",
  }
);

module.exports = mongoose.model("Task", TaskSchema);
