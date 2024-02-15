import { useNavigate } from "react-router-dom";
import { autoLogin, logout, setLoggedUser } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getLoggedUser } from "../utils/utilityFunctions";
import { isExpired } from "react-jwt";
import { toast } from "react-toastify";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function useAutoLogin() {
  const dispatch = useAppDispatch();
  const stateToken = useAppSelector((state) => state.auth.token);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  let token = stateToken;

  const tokenStorage = localStorage.getItem("token");
  if (stateToken && tokenStorage) {
    if (stateToken !== tokenStorage) token = tokenStorage;
  }
  if (!tokenStorage) {
    token && localStorage.setItem("token", token);
  }
  if ((token && isExpired(token)) || !token) {
    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      dispatch(autoLogin(refresh)).then((response) => {
        if (response.payload.detail) {
          toast.error(response.payload, { position: "bottom-right" });
          navigate("/auth?mode=login");
        }
      });
      return;
    }
    dispatch(logout());
  }
  if (token && !isExpired(token)) {
    if (!loggedUser) {
      const user = token && (await getLoggedUser(token));
      dispatch(setLoggedUser(user));
    }
  }
}