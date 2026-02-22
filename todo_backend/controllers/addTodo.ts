import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const addTodo = async (req: Request, res: Response) => {
  const { todo_task } = req.body;

  try {
    if (!todo_task) throw "Todo task must be provided.";
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }

  // create todo with completed set to false by default
  await todoModel.create({
    todo_task: todo_task,
    completed: false,
  });

  res.status(200).json({
    status: "Todo created successfully",
  });
};

export default addTodo;
