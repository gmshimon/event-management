import React, { useEffect } from "react";
import Navbar from "../Component/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";
import { fetchUser, logoutUser } from "../Redux/Slice/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
const Main = () => {
  const { user, isGetUserDataLoading } = useSelector((state) => state.user);
  const location = useLocation();
  const isLoginPage =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkTokenExpiration = () => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken) {
      // console.log("checking")
      const { expiration } = JSON.parse(storedToken);
      const currentTime = new Date().getTime();
      if (currentTime > expiration) {
        // Token has expired, log out the user
        localStorage.removeItem("userToken");
        dispatch(logoutUser());
      } else {
        if (!user?.email) {
          dispatch(fetchUser());
        }
      }
    }
  };
console.log(user)
  useEffect(() => {
    // Call checkTokenExpiration every sec (1 * 1000 milliseconds)
    const tokenExpirationInterval = setInterval(checkTokenExpiration, 1 * 1000);
    // Clean up the interval on component unmount
    return () => clearInterval(tokenExpirationInterval);
  }, [checkTokenExpiration]);
  if (isGetUserDataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {isLoginPage || <Navbar />}
      <Outlet />
    </>
  );
};

export default Main;
