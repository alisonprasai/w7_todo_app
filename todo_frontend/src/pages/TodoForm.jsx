import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function TodoForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/todos/${id}`)
        .then(res => res.json())
        .then(data => {
          const todo = data.data || data;
          setTitle(todo.title);
          setDescription(todo.description);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id ? `${API_URL}/todos/${id}` : `${API_URL}/todos`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    }).then(() => navigate("/"));
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>{id ? "Edit Todo" : "New Todo"}</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          {id ? "Update Todo" : "Create Todo"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    background: "#ff6a00",
    color: "#fff",
    border: "none"
  }
};

export default TodoForm;