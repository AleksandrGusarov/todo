import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const tasksState = useSelector((state: RootState) => state.tasks);

  if (!tasksState) return null;

  const { items, filter } = tasksState;

  const filteredTasks = React.useMemo(() => {
    switch (filter) {
      case 'active':
        return items.filter(task => !task.completed);
      case 'completed':
        return items.filter(task => task.completed);
      default:
        return items;
    }
  }, [items, filter]);
  console.log('Filtered tasks:', filteredTasks);

  return (
    <ul>
      {filteredTasks.map(task => (
        <TodoItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          deadline={task.deadline}
        />
      ))}
    </ul>
  );
};

export default TodoList;
