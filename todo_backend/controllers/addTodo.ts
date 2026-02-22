import { Request, Response } from "express";
import todoModel from "../models/todo.model";

const addTodo = async (req: Request, res: Response) => {
  try {
    const { title, description, priority, dueDate, category } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required.",
      });
    }

    // 🔥 Find last todo to generate next numeric id
    const lastTodo = await todoModel.findOne().sort({ id: -1 });

    const nextId = lastTodo ? lastTodo.id + 1 : 1;

    // Create new todo
    const newTodo = await todoModel.create({
      id: nextId,
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate || null,
      category: category || "general",
      completed: false, // default
    });

    return res.status(201).json({
      status: "success",
      data: newTodo,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong.",
    });
  }
};

export default addTodo;
