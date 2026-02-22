import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const deleteToDo = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  await todoModel.deleteOne({
    _id: taskId,
  });

  res.status(200).json({
    message: "Todo task deleted successfully.",
  });
};

export default deleteToDo;
