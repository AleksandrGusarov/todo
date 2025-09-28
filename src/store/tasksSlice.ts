import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string;
};

export type Filter = 'all' | 'active' | 'completed';

type TasksState = {
  items: Task[];
  filter: Filter; 
};

const initialState: TasksState = {
  items: [],
  filter: 'all',
};


const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ title: string; deadline?: string }>) {
      const deadline = typeof action.payload.deadline === 'string' ? action.payload.deadline : undefined;
      state.items.push({
        id: uuidv4(),
        title: action.payload.title,
        completed: false,
        deadline,
      });
    },
    toggleTask(state, action: PayloadAction<string>) {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clearCompleted(state) {
      state.items = state.items.filter((t) => !t.completed);
    },
     setFilter(state, action: PayloadAction<Filter>) {
      state.filter = action.payload;
    },
  },
});

export const { addTask, toggleTask, removeTask, clearCompleted, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
export type { TasksState };
