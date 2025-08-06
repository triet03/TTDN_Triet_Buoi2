// File: components/TodoList.jsx

import { Card, CardContent, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseIcon from '@mui/icons-material/Pause';

const statusColors = {
  todo: '#f0f0f0',      // Chưa làm
  doing: '#e3f2fd',    // Đang làm
  done: '#fff8e1'      // Đã xong
};

function TodoList({ todos, onMove, onDelete }) {
  const statuses = [
    { key: 'todo', label: 'Chưa làm' },
    { key: 'doing', label: 'Đang làm' },
    { key: 'done', label: 'Đã xong' }
  ];

  return (
    <Grid container spacing={2}>
      {statuses.map(({ key, label }) => (
        <Grid item xs={12} sm={6} md={4} key={key}>
          <Typography variant="h6" align="center" gutterBottom>
            {label}
          </Typography>

          <div style={{ backgroundColor: '#fafafa', padding: 12, borderRadius: 8, minHeight: 400 }}>
            {todos.filter(todo => todo.status === key).map((todo) => (
              <Card key={todo.id} style={{ marginBottom: 10, backgroundColor: statusColors[key], borderRadius: 6 }}>
                <CardContent>
                  <Typography variant="subtitle1" style={{ textDecoration: todo.isCompleted ? 'line-through' : 'none' }}>
                    {todo.title}
                  </Typography>
                  {todo.description && (
                    <Typography variant="body2" color="textSecondary">
                      {todo.description}
                    </Typography>
                  )}

                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    {key !== 'todo' && (
                      <Tooltip title="Chuyển về chưa làm">
                        <IconButton onClick={() => onMove(todo, 'todo')}><PauseIcon /></IconButton>
                      </Tooltip>
                    )}
                    {key !== 'doing' && (
                      <Tooltip title="Chuyển sang đang làm">
                        <IconButton onClick={() => onMove(todo, 'doing')}><PlayArrowIcon /></IconButton>
                      </Tooltip>
                    )}
                    {key !== 'done' && (
                      <Tooltip title="Đánh dấu đã xong">
                        <IconButton onClick={() => onMove(todo, 'done')}><DoneIcon /></IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Xóa">
                      <IconButton onClick={() => onDelete(todo.id)}><DeleteIcon /></IconButton>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Grid>
      ))}
    </Grid>
  );
}

export default TodoList;
