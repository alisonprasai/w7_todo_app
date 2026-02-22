import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const getTodos = async (req: Request, res: Response) => {
  // fetch all todo tasks from the database
  const todos = await todoModel.find({});

  res.status(200).json({
    status: "success",
    total_tasks: todos.length,
    data: todos,
  });
};

export default getTodos;
