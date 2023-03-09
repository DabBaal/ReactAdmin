//路由部分
import { useRoutes } from "react-router-dom"
import { loginRoutesList } from './routes';

function App() {
  const element = useRoutes(loginRoutesList)
  return (element);
}

export default App;
