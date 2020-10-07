const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema(
  {
    title: String,
    description: String,
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

module.exports = model("Project", ProjectSchema);
