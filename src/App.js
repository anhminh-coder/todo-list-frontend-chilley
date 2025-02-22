import { useState, useEffect } from "react";
import { Container, Typography, Paper, Box, CircularProgress } from "@mui/material";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const API_URL = "https://todo-list-backend-chilley.onrender.com/api/v1/tasks";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      let res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      res = await res.json();
      setTodos(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTodo = async (title, description) => {
    try {
      let res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
      res = await res.json();
      const id = res.data;
      setTodos([...todos, { id: id, title, description, completed: false }]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !completed } : todo)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, width: "100%", maxWidth: 400, mx: "auto" }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
          Todo List
        </Typography>
        <TodoInput addTodo={addTodo} />
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        )}
      </Paper>
    </Container>
  );
}

export default App;