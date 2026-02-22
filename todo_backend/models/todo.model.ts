import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo_task: {
    type: String,
  },

  completed: {
    type: Boolean,
  },
});

const todoModel = mongoose.model("todos", todoSchema);

export default todoModel;