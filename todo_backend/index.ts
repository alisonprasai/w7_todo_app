import express from "express";
import mongoose from "mongoose";
import getTodos from "./controllers/getTodo";
import addTodo from "./controllers/addTodo";
import updateTodo from "./controllers/updateTodo";
import deleteToDo from "./controllers/deleteTodo";
// access environment variable
require("dotenv").config();

const server = express();

server.use(express.json());

server.listen(8000, async () => {
  console.log("Server started successfully!");
  console.log(process.env.mongo_url)

  // inject environment variable
  await mongoose.connect(String(process.env.mongo_url));

  console.log("Database connected successfully!");
});

server.get("/", getTodos);
server.post("/", addTodo);
server.patch("/:id", updateTodo);
server.delete("/:id", deleteToDo);
