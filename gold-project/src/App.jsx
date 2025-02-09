import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate, RouterProvider } from 'react-router-dom';
import router from './router/router';

function App() {

  return (
    <>
   
      <RouterProvider router={router} />
    </>
  );
}

export default App;
