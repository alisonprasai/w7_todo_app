import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const updateTodo = async (req: Request, res: Response) => {
  const taskId = req.params.id;
  const { todo_task, completed } = req.body;

  // update the todo_task text and completed status based on the task ID
  const updateResult = await todoModel.updateOne(
    { _id: taskId },
    { todo_task: todo_task, completed: completed }
  );

  if (updateResult.modifiedCount === 0) {
    return res.status(400).json({
      message: "Unable to locate or update the requested todo task.",
    });
  }

  const updatedTask = await todoModel.findOne({ _id: taskId });

  res.status(200).json({
    status: "Todo task updated successfully",
    data: updatedTask,
  });
};

export default updateTodo;
