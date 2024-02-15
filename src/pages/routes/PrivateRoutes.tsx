import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import RootLayout from "../Root";
import useAutoLogin from "../../custom_hooks/useAutoLogin";

export default function PrivateRoutes() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  useAutoLogin();

  return (
    <RootLayout>
      {isAuthenticated ? <Outlet /> : <Navigate to="/auth?mode=login" />}
    </RootLayout>
  );
}
