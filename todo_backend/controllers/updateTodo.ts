import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const updateTodo = async (req: Request, res: Response) => {
  try {
    const todoId = Number(req.params.id);

    if (Number.isNaN(todoId)) {
      return res.status(400).json({
        message: "Invalid todo id. It must be a number.",
      });
    }

    const { title, description, completed, priority, dueDate, category } =
      req.body;

    // build update object only with fields that are provided
    const updateFields: any = {};

    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (completed !== undefined) updateFields.completed = completed;
    if (priority !== undefined) updateFields.priority = priority;
    if (dueDate !== undefined) updateFields.dueDate = dueDate;
    if (category !== undefined) updateFields.category = category;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        message: "No fields provided to update.",
      });
    }

    // update by numeric id (NOT Mongo _id)
    const updateResult = await todoModel.updateOne(
      { id: todoId },
      updateFields,
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({
        message: "Todo not found.",
      });
    }

    if (updateResult.modifiedCount === 0) {
      // matched but nothing changed (same values sent)
      const existingTask = await todoModel.findOne({ id: todoId });

      return res.status(200).json({
        status: "No changes made (data was the same).",
        data: existingTask,
      });
    }

    const updatedTask = await todoModel.findOne({ id: todoId });

    return res.status(200).json({
      status: "Todo updated successfully",
      data: updatedTask,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong.",
    });
  }
};

export default updateTodo;
