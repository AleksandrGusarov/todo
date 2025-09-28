import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import type { TasksState } from './tasksSlice';
import { loadState, saveState, loadFilter } from './localStorage';

const preloadedState: { tasks: TasksState } = {
  tasks: {
    items: loadState().items || [],
    filter: loadFilter() || 'all',
  },
};

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState().tasks;
  saveState(state);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
