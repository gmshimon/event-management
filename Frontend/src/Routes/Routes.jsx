import { createBrowserRouter } from "react-router";
import Main from "../Layout/Main";
import LoginPage from '../Page/LoginPage/LoginPage'
import Homepage from "../Page/Homepage/Homepage";
import RegistrationPage from "../Page/RegistrationPage/RegistrationPage";
import AddEventPage from "../Page/AddEventPage/AddEventPage";
import MyEvent from "../Page/MyEvent/MyEvent";
export const router = createBrowserRouter([
{
    path:'',
    element:<Main></Main>,
    children:[
        {
            path:"/",
            element:<Homepage/>
        },
        {
            path:'login',
            element:<LoginPage/>
        },
        {
            path:'register',
            element:<RegistrationPage/>
        },
        {
            path:'/add-event',
            element:<AddEventPage/>
        },
        {
            path:'/my-events',
            element:<MyEvent/>
        }
    ]
}

])