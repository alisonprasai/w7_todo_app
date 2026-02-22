import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => res.json())
      .then(data => setTodos(data.data || data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE"
    }).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>

      {todos.map(todo => (
        <div key={todo.id} style={styles.card}>
          <h3>{todo.title}</h3>

          <div>
            <Link to={`/todo/${todo.id}`} style={styles.viewBtn}>
              View
            </Link>

            <Link to={`/edit/${todo.id}`} style={styles.editBtn}>
              Edit
            </Link>

            <button
              onClick={() => handleDelete(todo.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px"
  },
  card: {
    border: "1px solid #ff6a00",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "6px"
  },
  viewBtn: {
    marginRight: "10px",
    textDecoration: "none"
  },
  editBtn: {
    marginRight: "10px",
    textDecoration: "none"
  },
  deleteBtn: {
    background: "#ff6a00",
    color: "#fff",
    border: "none",
    padding: "5px 10px"
  }
};

export default TodoList;