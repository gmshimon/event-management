
import { useSelector } from "react-redux";
import { Navigate, } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  // If authenticated, render children
  if (user && user.email) {
    return children;
  }

  // Otherwise, redirect to login with redirect state
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
