import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Main } from '@src/router/main';

export function RouterConfig() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/*" element={<Main />}></Route>
        <Route path="*" element={<Navigate to="/home" replace />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
