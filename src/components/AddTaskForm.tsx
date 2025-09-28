import React from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { TextField, Button, Box } from '@mui/material';
import type { AppDispatch } from '../store';


const AddTaskForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = React.useState('');
  const [deadline, setDeadline] = React.useState<Date | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      title,
      deadline: deadline ? deadline.toISOString() : undefined,
    }));

    setTitle('');
    setDeadline(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <TextField
        label="Название задачи"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ flex: 1 }}
      />

        <DateTimePicker
            label="Дедлайн"
            value={deadline}
            onChange={(newValue) => setDeadline(newValue)}
            slots={{ textField: TextField }}
            slotProps={{
                textField: {
                variant: 'outlined',
                size: 'small',
                helperText: null,
                },
            }}
        />

      <Button type="submit" variant="contained">
        Добавить
      </Button>
    </Box>
  );
};

export default AddTaskForm;
