import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<FormPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
