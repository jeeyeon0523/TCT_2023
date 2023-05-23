import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './res/reset.css';
import App from './App';
import RouterTestPage from './RouterTestPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/test' element={<RouterTestPage />} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);
