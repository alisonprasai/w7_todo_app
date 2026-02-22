import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../config";

function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/todos/${id}`)
      .then(res => res.json())
      .then(data => setTodo(data.data || data));
  }, [id]);

  if (!todo) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
    </div>
  );
}

export default TodoDetail;