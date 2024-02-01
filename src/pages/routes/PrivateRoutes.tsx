import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import RootLayout from "../Root";
import useAutoLogin from "../../custom_hooks/useAutoLogin";

export default function PrivateRoutes() {
  const isToken = useAppSelector((state) => state.auth.token);
  useAutoLogin();

  return (
    <RootLayout>
      {isToken ? <Outlet /> : <Navigate to="/auth?mode=login" />}
    </RootLayout>
  );
}
