import { Outlet } from "react-router-dom";

import RootLayout from "../Root";

export default function PrivateRoutes() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
