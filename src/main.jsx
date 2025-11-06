import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css'; 
import App from './App'; 
import HomePage from './pages/HomePage';
import RulesPage from './pages/RulesPage';
import GamePage from './pages/GamePage';
import ScoresPage from './pages/ScoresPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SelectionPage from './pages/SelectionPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, 
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/rules', element: <RulesPage /> },
      { path: '/games', element: <SelectionPage /> },
      { path: '/games/:mode', element: <GamePage /> }, 
      { path: '/scores', element: <ScoresPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);