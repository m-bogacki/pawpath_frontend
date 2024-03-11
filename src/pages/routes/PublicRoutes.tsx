import { Outlet } from "react-router-dom";

import RootLayout from "../Root";
import { isExpired } from "react-jwt";
import { setLoggedUser } from "../../store/authSlice";
import { getLoggedUser } from "../../utils/utilityFunctions";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export default function PublicRoutes() {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const checkUser = async () => {
      const tokenStorage = localStorage.getItem("token");
      if (tokenStorage && !isExpired(tokenStorage)) {
        console.log(loggedUser);
        if (!loggedUser) {
          const user = tokenStorage && (await getLoggedUser(tokenStorage));
          dispatch(setLoggedUser(user));
        }
      }
    };

    checkUser();
  }, [dispatch, loggedUser]);

  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}
