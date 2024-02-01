import { renderToStaticMarkup } from "react-dom/server";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DivIcon, divIcon } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { decodeToken, isExpired } from "react-jwt";
import { TToken, TTokenData, TTokenResponse } from "../Types/Auth";
import { AuthAPI } from "../api/client";
import { get } from "http";
import { TUser } from "../Types/User";

function getFontAwesomeMarkerIcon(fontAwesomeIcon: IconDefinition): DivIcon {
  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon
      className="w-full h-full text-secondAccent hover:text-primaryAccent"
      icon={fontAwesomeIcon}
    ></FontAwesomeIcon>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    iconSize: [30, 30],
  });

  return customMarkerIcon;
}

type TInitialAuthData = {
  token: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
};

function extractUserId(token: TToken) {
  return decodeToken(token) as TTokenData;
}

async function getUser(userId: number) {
  const userData = await AuthAPI.fetchUser(userId)
    .then((response) => response)
    .catch((err) => err);
  return userData.data;
}

async function getLoggedUser(token: TToken) {
  return await getUser(extractUserId(token).user_id);
}

function getInitialAuthData(): TInitialAuthData {
  const token = localStorage.getItem("token");
  const initialAuthData: TInitialAuthData = {
    token: token,
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: token != null && !isExpired(token),
  };

  return initialAuthData;
}

export {
  getFontAwesomeMarkerIcon,
  getInitialAuthData,
  extractUserId,
  getUser,
  getLoggedUser,
};
