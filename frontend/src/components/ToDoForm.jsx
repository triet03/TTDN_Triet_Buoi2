import { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      description,
      dueDate,
      priority,
      isCompleted: false,
      status: 'todo', // 👈 Thêm status mặc định là 'todo'
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Low');
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Thêm công việc mới
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Tên công việc"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />

          <TextField
            label="Mô tả"
            multiline
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />

          <TextField
            label="Hạn chót"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            label="Độ ưu tiên"
            select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            fullWidth
          >
            <MenuItem value="Low">Thấp</MenuItem>
            <MenuItem value="Medium">Trung bình</MenuItem>
            <MenuItem value="High">Cao</MenuItem>
          </TextField>

          <Button variant="contained" type="submit">
            Thêm
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export default TodoForm;
