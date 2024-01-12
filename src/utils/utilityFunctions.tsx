import { renderToStaticMarkup } from "react-dom/server";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { DivIcon, divIcon } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

export default getCustomMarkerIcon;
