import { Navigate } from 'react-router-dom';

import Login from '../pages/login';
import Admin from '../pages/admin';
import Home from "../pages/home"
import Category from "../pages/category"
import Product from "../pages/product"
import Role from "../pages/role"
import User from "../pages/user"
import Bar from "../pages/charts/bar"
import Line from "../pages/charts/line"
import Pie from "../pages/charts/pie"

//login相关路由
export const loginRoutesList = [
    { path: "/*", element: <Admin /> },
    { path: "/login", element: <Login /> },
]

//admin页面内的组件
export const adminRoutesList = [
    { path: "/home", element: <Home /> },
    { path: "/category", element: <Category /> },
    { path: "/product", element: <Product /> },
    { path: "/role", element: <Role /> },
    { path: "/user", element: <User /> },
    { path: "/charts/bar", element: <Bar /> },
    { path: "/charts/line", element: <Line /> },
    { path: "/charts/pie", element: <Pie /> },
    { path: "*", element: <Navigate to="/home" /> }
]

