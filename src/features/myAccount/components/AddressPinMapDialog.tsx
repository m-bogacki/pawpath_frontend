import { MapContainer, TileLayer } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";
import { LatLngExpression } from "leaflet";

type AddressPinMapDialogProps = {
  onDragEnd: (latLng: any) => void;
  markerPosition: LatLngExpression;
};

export default function AddressPinMapDialog({
  onDragEnd,
  markerPosition,
}: AddressPinMapDialogProps) {
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box w-[80%] h-[80%]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="w-full h-full overflow-hidden relative z-10">
          <MapContainer
            id="map2"
            className="h-full z-20 m-5"
            center={[52.394142, 16.897701]}
            zoom={13}
            scrollWheelZoom={true}
            bounceAtZoomLimits={true}
            maxZoom={18}
            minZoom={6}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <DraggableMarker
              onDragEnd={onDragEnd}
              markerPosition={markerPosition}
            />
          </MapContainer>
        </div>
      </div>
    </dialog>
  );
}
