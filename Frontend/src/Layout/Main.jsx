import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
const Main = () => {
    const location = useLocation()
     const isLoginPage =
    location.pathname.includes('login') ||
    location.pathname.includes('register')
    return (
        <>
          {isLoginPage || <Navbar />}
            <Outlet/>
        </>
    );
};

export default Main;