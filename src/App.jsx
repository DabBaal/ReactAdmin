import React from 'react';

//路由部分
import { useRoutes } from "react-router-dom"
import routesList from './routes';

function App() {
  const element = useRoutes(routesList)

  return (element);
}

export default App;
