import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTask, removeTask } from '../store/tasksSlice';
import type { AppDispatch } from '../store';

type Props = {
  id: string;
  title: string;
  completed: boolean;
  deadline?: string;
};

function getTimeLeft(deadline: string): string {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end.getTime() - now.getTime();

  if (diff <= 0) return 'Время истекло';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return `${days}д ${hours}ч ${minutes}м ${seconds}с`;
}

const TodoItem: React.FC<Props> = ({ id, title, completed, deadline }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [timeLeft, setTimeLeft] = useState(deadline ? getTimeLeft(deadline) : '');

  useEffect(() => {
    if (!deadline) return;

    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft(deadline));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [deadline]);

  const handleToggle = () => {
    dispatch(toggleTask(id));
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(removeTask(id));
  };

  const deadlineExpired = useMemo(() => {
    if (!deadline) return false;
    const now = new Date();
    const dlDate = new Date(deadline);
    return dlDate <= now;
  }, [deadline]);

  return (
    <li
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        color: deadlineExpired ? 'red' : 'inherit',
      }}
      onClick={handleToggle}
    >
      <input
        type="checkbox"
        checked={completed}
        readOnly
        onClick={(e) => e.stopPropagation()}
      />
      {title}

      {deadline && (
        <span style={{ marginLeft: 8, fontWeight: deadlineExpired ? 'bold' : 'normal' }}>
          {timeLeft}
        </span>
      )}

      <button
        onClick={handleRemove}
        style={{ marginLeft: 10 }}
        aria-label={`Удалить задачу ${title}`}
      >
        Удалить
      </button>
    </li>
  );
};

export default TodoItem;
