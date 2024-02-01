import { Marker } from "react-leaflet";
import { TAnimalCare } from "../../../../Types/Animal";
import { getFontAwesomeMarkerIcon } from "../../../../utils/utilityFunctions";
import "../../../../index.css";
import { faDog } from "@fortawesome/free-solid-svg-icons";

export default function AnimalCareMarker({
  animalCare,
  onClick,
}: {
  animalCare: TAnimalCare;
  onClick?: () => void;
}) {
  const latitude = animalCare.animals[0].owner?.address?.latitude;
  const longitude = animalCare.animals[0].owner?.address?.longitude;

  return (
    <Marker
      position={[latitude, longitude]}
      icon={getFontAwesomeMarkerIcon(faDog)}
      eventHandlers={{
        click: (e) => {
          console.log(e.latlng);
          onClick && onClick();
        },
      }}
    ></Marker>
  );
}
