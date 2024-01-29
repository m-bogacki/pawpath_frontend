import { renderToStaticMarkup } from "react-dom/server";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DivIcon, divIcon } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isExpired } from "react-jwt";

function getCustomMarkerIcon(fontAwesomeIcon: IconDefinition): DivIcon {
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

function getInitialAuthData(): TInitialAuthData {
  const token = localStorage.getItem("token");
  const initialAuthData: TInitialAuthData = {
    token: token,
    refresh: localStorage.getItem("refresh"),
    isAuthenticated: token != null && !isExpired(token),
  };
  return initialAuthData;
}

export { getCustomMarkerIcon, getInitialAuthData };
