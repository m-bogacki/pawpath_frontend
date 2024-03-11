import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import AnimalCareMarker from "../features/map/componenets/AnimalCareMarker";

import SideMenu from "../features/map/componenets/SideMenu";
import { fetchAnimalCareList } from "../store/animalCareSlice";
import { fetchAnimalList } from "../store/animalsSlice";

export default function Map() {
  const dispatch = useAppDispatch();
  const animalCareList = useAppSelector(
    (state) => state.animalCare.animalCareList
  );
  const user = useAppSelector((state) => state.auth.user);
  const [selectedAnimalCare, setSelectedAnimalCare] = useState<number>();
  useEffect(() => {
    dispatch(fetchAnimalCareList());
    dispatch(fetchAnimalList());
  }, [dispatch]);
  return (
    <>
      <div className="w-full h-full min-h-[500px] overflow-hidden relative z-10">
        <MapContainer
          id="map"
          className="h-full z-20"
          center={[52.394142, 16.897701]}
          zoom={13}
          scrollWheelZoom={true}
          bounceAtZoomLimits={true}
          maxZoom={18}
        >
          {animalCareList.map((animalCare) => {
            if (animalCare.animals.length === 0) return null;
            return (
              <AnimalCareMarker
                key={animalCare.id}
                animalCare={animalCare}
                onClick={() => {
                  if (selectedAnimalCare !== animalCare.id)
                    setSelectedAnimalCare(animalCare.id);
                }}
                selected={selectedAnimalCare === animalCare.id}
                bgColor={
                  animalCare.animals[0].owner.username === user?.username
                    ? "white"
                    : null
                }
              />
            );
          })}
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <SideMenu selectedAnimalCare={selectedAnimalCare} />
      </div>
    </>
  );
}
