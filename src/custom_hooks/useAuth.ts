import { redirect } from "react-router-dom";
import { logout, setLoggedUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser } from "../utils/utilityFunctions";
import { isExpired } from "react-jwt";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function () {
  console.log("Rerun");
  const dispatch = useAppDispatch();
  const stateToken = useAppSelector((state) => state.auth.token);
  const loggedUser = useAppSelector((state) => state.auth.user);
  let token = stateToken;
  if (!stateToken) {
    token = localStorage.getItem("token");
  }
  if (!token) redirect("/");
  if (token && isExpired(token)) {
    dispatch(logout());
    redirect("/auth?mode=login");
  }
  if (token && !isExpired(token) && !loggedUser) {
    const user = token && (await getLoggedUser(token));
    dispatch(setLoggedUser(user));
  }
}
