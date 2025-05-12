import React from 'react';
import { createRoot } from 'react-dom/client';
import GanttChart from './components/GanttChart';

const App = () => {
  return (
    <GanttChart/>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);