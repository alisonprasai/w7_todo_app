import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const getTodoById = async (req: Request, res: Response) => {
  try {
    const todoId = Number(req.params.id);

    if (Number.isNaN(todoId)) {
      return res.status(400).json({
        message: "Invalid todo id. It must be a number.",
      });
    }

    const todo = await todoModel.findOne({ id: todoId });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong.",
    });
  }
};

export default getTodoById;
