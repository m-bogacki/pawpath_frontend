import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LatLngExpression, divIcon } from "leaflet";
import { useMemo, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Marker, Popup } from "react-leaflet";

type DraggableMarkerProps = {
  onDragEnd: (latLng: any) => void;
  markerPosition: LatLngExpression;
};

export default function DraggableMarker({
  onDragEnd,
  markerPosition,
}: DraggableMarkerProps) {
  const markerRef = useRef<any>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          onDragEnd(marker.getLatLng());
        }
      },
    }),
    [onDragEnd]
  );
  const icon = useMemo(
    () =>
      divIcon({
        html: renderToStaticMarkup(
          <FontAwesomeIcon
            className={`w-full h-full mt-2 btn-circle text-neutral p-2 circle bg-accent shadow-accent shadow-[0px_0px_20px_10px]"
             transition-all duration-300 ease-in-out`}
            icon={faHome}
          ></FontAwesomeIcon>
        ),
        iconSize: [30, 30],
      }),
    []
  );

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={markerPosition}
      ref={markerRef}
      icon={icon}
    >
      <Popup className="ml-2" minWidth={90}></Popup>
    </Marker>
  );
}
