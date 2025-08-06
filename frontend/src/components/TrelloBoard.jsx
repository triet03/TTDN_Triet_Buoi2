import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const initialData = {
  Low: [
    { id: 'task-1', title: 'Đọc tài liệu' },
    { id: 'task-2', title: 'Họp nhóm cuối tuần' },
  ],
  Medium: [
    { id: 'task-3', title: 'Viết báo cáo tuần' },
  ],
  High: [
    { id: 'task-4', title: 'Sửa lỗi quan trọng' },
    { id: 'task-5', title: 'Triển khai lên server' },
  ],
};

const TrelloBoard = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = Array.from(columns[sourceCol]);
    const [movedItem] = sourceItems.splice(source.index, 1);

    const destItems = Array.from(columns[destCol]);
    destItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        To-do Trello Style
      </Typography>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.entries(columns).map(([priority, tasks]) => (
            <Grid item xs={12} md={4} key={priority}>
              <Typography variant="h6" align="center" color={
                priority === 'High' ? 'error' : priority === 'Medium' ? 'warning.main' : 'success.main'
              }>
                {priority}
              </Typography>
              <Droppable droppableId={priority}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      backgroundColor: '#f4f4f4',
                      padding: 2,
                      minHeight: 400,
                      borderRadius: 2,
                    }}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            sx={{
                              mb: 2,
                              backgroundColor: snapshot.isDragging ? '#e0f7fa' : '#ffffff',
                              boxShadow: snapshot.isDragging ? 6 : 1,
                              transition: '0.2s',
                            }}
                          >
                            <CardContent>
                              <Typography>{task.title}</Typography>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
};

export default TrelloBoard;
