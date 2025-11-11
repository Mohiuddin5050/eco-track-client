import { createBrowserRouter } from "react-router";

import HomePage from "../pages/HomePage";
import MainLayout from "../Layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Challenges from "../pages/Challenges";
import MyActivities from "../pages/MyActivities";


const router= createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children:[
            {
                index: true,
                element:<HomePage/>,
            },
            {
                path: 'login',
                element:<Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'challenges',
                element: <Challenges></Challenges>
            },
            {
                path: 'activities',
                element: <MyActivities></MyActivities>
            }
        ]
    }
])


export default router;