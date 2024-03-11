import { Marker, Popup, useMapEvents } from "react-leaflet";
import { useCallback, useMemo } from "react";
import { TAnimalCare } from "../../../Types/Animal";
import "../../../index.css";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { divIcon } from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { renderToStaticMarkup } from "react-dom/server";
import { capitalize } from "../../../utils/utilityFunctions";

export default function AnimalCareMarker({
  animalCare,
  onClick,
  selected,
  bgColor,
}: {
  animalCare: TAnimalCare;
  onClick?: () => void;
  selected?: boolean;
  bgColor?: string | null | undefined;
}) {
  const latitude = animalCare.animals[0].owner?.address?.latitude ?? 52;

  const longitude = animalCare.animals[0].owner?.address?.longitude ?? 0;

  const icon = useMemo(
    () =>
      divIcon({
        html: renderToStaticMarkup(
          <FontAwesomeIcon
            className={`w-full h-full p-3 ${
              bgColor ? "bg-" + bgColor : "bg-slate-400"
            } btn-circle transition-all ${
              selected
                ? "animate-bounce text-accent shadow-[0px_0px_5px_0px] "
                : "text-neutral hover:p-4 hover:bg-neutral-600"
            } transition-all duration-300 ease-in-out`}
            icon={faDog}
          ></FontAwesomeIcon>
        ),
        iconSize: [30, 30],
      }),
    [bgColor, selected]
  );
  const map = useMapEvents({
    click() {
      map.locate();
    },
  });

  const handleClick = useCallback(
    (e: any) => {
      if (map.getCenter().distanceTo(e.latlng) > 1) {
        map.flyTo(e.latlng, map.getZoom(), { duration: 0.5 });
      }
      onClick && onClick();
    },
    [map, onClick]
  );

  const renderAddress = useCallback(() => {
    if (animalCare.animals[0].owner.address) {
      return Object.entries(animalCare.animals[0].owner.address).map(
        ([key, value], index) => (
          <p key={index}>{`${capitalize(key)}: ${value}`}</p>
        )
      );
    }
  }, [animalCare.animals]);

  return (
    <Marker
      riseOnHover={true}
      position={[latitude as number, longitude as number]}
      icon={icon}
      eventHandlers={{
        click: handleClick,
      }}
      riseOffset={100}
      zIndexOffset={selected ? 90 : 0}
    >
      <Popup
        closeButton={false}
        offset={[12, -15]} // Adjust the offset here to center the popup with the marker
      >
        <div>{renderAddress()}</div>
      </Popup>
    </Marker>
  );
}
