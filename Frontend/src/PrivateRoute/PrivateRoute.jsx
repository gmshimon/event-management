import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { fetchUser } from "../Redux/Slice/AuthSlice";

const PrivateRoute = ({ children }) => {
  const { user, isGetUserDataLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();

  // Fetch user data if a token exists but user info is not present
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    if (storedToken && !user?.email && !isGetUserDataLoading) {
      dispatch(fetchUser());
    }
  }, [dispatch, user?.email, isGetUserDataLoading]);

  console.log(isGetUserDataLoading)


  // Show loader while fetching user data
  if (isGetUserDataLoading) {
    console.log("Check the loading")
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render children
  if (user && user.email) {
    return children;
  }

  // Otherwise, redirect to login with redirect state
//   return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
