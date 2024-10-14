import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom';
import List from './pages/List';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Register from './pages/Register';
import Login from './pages/Login';

const routeConfig = [
  {
    path: "/books",
    element: <List />
  },
  {
    path: "/books/add",
    element: <Create />
  },
  {
    path: "/books/edit/:id",
    element: <Edit />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  }
];
function App() {
  const routes = useRoutes(routeConfig);
  
  return <div>{routes}</div>
}

export default App
