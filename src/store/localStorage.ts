import type { TasksState, Filter } from './tasksSlice';
import type { Task } from './tasksSlice';

const TASKS_KEY = 'tasks';
const FILTER_KEY = 'filter';

export const loadState = (): { items: Task[] } => {
  try {
    const serialized = localStorage.getItem('tasks');
    if (!serialized) return { items: [] };
    return { items: JSON.parse(serialized) };
  } catch {
    return { items: [] };
  }
};

export const loadFilter = (): Filter => {
  try {
    const serialized = localStorage.getItem('filter');
    if (!serialized) return 'all';
    return JSON.parse(serialized);
  } catch {
    return 'all';
  }
};

export const saveState = (state: TasksState) => {
  try {
    const serializedItems = JSON.stringify(state.items);
    const serializedFilter = JSON.stringify(state.filter);
    localStorage.setItem('tasks', serializedItems);
    localStorage.setItem('filter', serializedFilter);
  } catch {
    // Игнорируем ошибки
  }
};

