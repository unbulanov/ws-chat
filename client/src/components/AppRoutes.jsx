import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import ChatPage from './ChatPage';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

export default AppRoutes;