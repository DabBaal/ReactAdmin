import { Navigate } from 'react-router-dom';

import Login from '../pages/login';
import Admin from '../pages/admin';

let routesList = [
    //设置默认路径，但是和admin路径冲突
    // {
    //     path: "/",
    //     element: <Navigate to="/login"></Navigate>
    // }
    {
        path: "/",
        element: <Admin />
    },
    {
        path: "/login",
        element: <Login />
    },
]

export default routesList