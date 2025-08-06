// App.js
import { useEffect, useState } from 'react';
import './styles/App.css';
import TodoForm from './components/ToDoForm';
import * as api from './api/todoApi';

import { Grid, Typography, Card, CardContent, Box } from '@mui/material';

function App() {
  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    const res = await api.getTodos();
    setTodos(res.data);
  };

  const addTodo = async (data) => {
    const res = await api.createTodo({
      ...data,
      title: data.title.trim(),
      dueDate: data.dueDate || null,
      status: 'todo',
      createdAt: new Date().toISOString(),
    });
    setTodos([res.data, ...todos]);
  };

  const toggleTodo = async (todo) => {
    const updated = {
      ...todo,
      status: todo.status === 'done' ? 'todo' : 'done',
    };
    await api.updateTodo(todo.id, updated);
    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
  };

  const moveTodo = async (todo, newStatus) => {
    const updated = { ...todo, status: newStatus };
    await api.updateTodo(todo.id, updated);
    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
  };

  const deleteTodo = async (id) => {
    await api.deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  };

  const getCardColor = (task) => {
    const today = new Date();
    const due = task.dueDate ? new Date(task.dueDate) : null;

    if (due && due < today && task.status !== 'done') return '#ffebee';
    if (due && (due - today) / (1000 * 60 * 60 * 24) < 1) return '#fff3e0';
    if (task.status === 'done') return '#e8f5e9';
    if (task.status === 'doing') return '#e3f2fd';
    if (task.priority === 'High') return '#fdecea';
    if (task.priority === 'Medium') return '#fff8e1';
    return '#e8eaf6';
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const statuses = [
    { key: 'todo', label: 'Chưa làm' },
    { key: 'doing', label: 'Đang làm' },
    { key: 'done', label: 'Đã xong' },
  ];

  return (
    <div className="app" style={{ padding: '16px' }}>
      <h1>Quản lý công việc</h1>
      <TodoForm onAdd={addTodo} />

      <Grid container spacing={2}>
        {statuses.map(({ key, label }) => (
          <Grid item xs={12} md={4} key={key}>
            <Typography variant="h6" align="center">
              {label}
            </Typography>

            <Box
              sx={{
                backgroundColor: '#f4f4f4',
                padding: 2,
                minHeight: 400,
                borderRadius: 2,
              }}
            >
              {todos
                .filter((t) => t.status === key)
                .map((todo) => (
                  <Card
                    key={todo.id}
                    sx={{
                      mb: 2,
                      backgroundColor: getCardColor(todo),
                      boxShadow: 1,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="body1"
                        style={{ textDecoration: todo.status === 'done' ? 'line-through' : 'none' }}
                      >
                        {todo.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {todo.description || 'Không có mô tả'}
                      </Typography>
                      <Box mt={1} display="flex" gap={1}>
                        {key !== 'todo' && (
                          <button onClick={() => moveTodo(todo, 'todo')}>⬅️</button>
                        )}
                        {key === 'todo' && (
                          <button onClick={() => moveTodo(todo, 'doing')}>➡️</button>
                        )}
                        {key === 'doing' && (
                          <button onClick={() => moveTodo(todo, 'done')}>✅</button>
                        )}
                        <button onClick={() => deleteTodo(todo.id)}>❌</button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
