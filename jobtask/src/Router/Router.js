import { createBrowserRouter } from "react-router-dom" 
import Main from './../Layout/Main';
import AddQuestions from "../Pages/AddQuestions/AddQuestions";
import Login from './../Pages/Login/Login';
import Register from "../Pages/Register/Register";




export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <AddQuestions />
            }, 
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '*',
    }
])