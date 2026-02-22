import express from "express";
import mongoose from "mongoose";
// import cors from "cors";
import getTodos from "./controllers/getTodo";
import getTodoById from "./controllers/getTodoById";
import addTodo from "./controllers/addTodo";
import updateTodo from "./controllers/updateTodo";
import deleteToDo from "./controllers/deleteTodo";
// access environment variable
require("dotenv").config();
const cors = require("cors");

const server = express();
server.use(
  cors({
    origin: "http://localhost:5173", // allow Vite dev server
    credentials: true, // only if you use cookies/sessions
  }),
);

server.use(express.json());

server.listen(8000, async () => {
  console.log("Server started successfully!");
  console.log(process.env.mongo_url);

  // inject environment variable
  await mongoose.connect(String(process.env.mongo_url));

  console.log("Database connected successfully!");
});

server.get("/todos", getTodos);
server.get("/todos/:id", getTodoById);
server.post("/todos", addTodo);
server.patch("/todos/:id", updateTodo);
server.delete("/todos/:id", deleteToDo);
