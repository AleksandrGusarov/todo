import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/tasksSlice';
import type { RootState, AppDispatch } from '../store';

const FilterButtons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentFilter = useSelector((state: RootState) => state.tasks.filter);

  const onClick = (filter: 'all' | 'active' | 'completed') => {
    dispatch(setFilter(filter));
  };

  return (
    <div style={{ margin: '10px 0' }}>
      {['all', 'active', 'completed'].map(filter => (
        <button
          key={filter}
          onClick={() => onClick(filter as 'all' | 'active' | 'completed')}
          disabled={currentFilter === filter}
          style={{ marginRight: 8 }}
        >
          {filter === 'all' ? 'Все' : filter === 'active' ? 'Активные' : 'Выполненные'}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
