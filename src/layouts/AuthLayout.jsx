import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../features/auth/authSlice";

const AuthLayout = () => {
  const token = useSelector(selectCurrentToken);

  return !token ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthLayout;
