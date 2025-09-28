import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store';
import { addTask, clearCompleted } from './store/tasksSlice';
import TodoList from './components/TodoList';
import FilterButtons from './components/FilterButtons';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (text.trim() !== '') {
      dispatch(addTask({ title: text, deadline: deadline || undefined }));
      setText('');
      setDeadline('');
    }
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };
  

  return (
    <div>
      <h1>Мои задачи</h1>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Введите задачу" />
      <input
        type="date"
        value={deadline}
        onChange={e => setDeadline(e.target.value)}
        placeholder="Дедлайн"
      />
      <button onClick={handleAdd}>Добавить</button>

      <FilterButtons />

      <TodoList />

      <button onClick={handleClearCompleted} style={{ marginTop: '10px' }}>
        Очистить завершённые
      </button>
    </div>
  );
};

export default App;
