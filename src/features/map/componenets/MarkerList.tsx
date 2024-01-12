import { Marker } from "leaflet";

export default function MarkerList({ markers }: { markers: Marker[] }) {
  return (
    <>
      {markers.map((marker) => {
        return marker;
      })}
    </>
  );
}
