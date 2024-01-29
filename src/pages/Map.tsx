import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useFetch from "../custom_hooks/useFetch";
import { TAnimalCare } from "../Types/Animal";
import { setAnimalCareList } from "../store/animalsSlice";
import AnimalCareMarker from "../features/map/componenets/animalCare/AnimalCareMarker";
import LoadingSpinner from "../components/LoadingSpinner";
import SideMenu from "../features/map/componenets/map/SideMenu";

export default function Map() {
  const dispatch = useAppDispatch();
  const animalCareList = useAppSelector((state) => state.animals.animalCare);
  const [selectedAnimalCare, setSelectedAnimalCare] = useState<number>();
  const { loading, error, sendRequest } = useFetch<TAnimalCare[]>();

  useEffect(() => {
    sendRequest(
      {
        url: "animal-care/",
        method: "GET",
      },
      (animalCares) => {
        if (animalCares) return dispatch(setAnimalCareList(animalCares));
      }
    );
  }, [dispatch, sendRequest]);

  return (
    <>
      {error && (
        <div className="flex justify-center items-center min-h-screen max-h-screen max-w-screen overflow-hidden relative z-10">
          <h1>Error</h1>
        </div>
      )}
      {loading && <LoadingSpinner />}
      {!loading && !error && (
        <>
          <div className="w-full h-full min-h-[500px] overflow-hidden relative z-10">
            <MapContainer
              className="h-full z-20"
              center={[52.394142, 16.897701]}
              zoom={13}
              scrollWheelZoom={true}
              bounceAtZoomLimits={true}
              maxZoom={15}
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
                  />
                );
              })}
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
              />
            </MapContainer>
            <SideMenu>
              <div className="flex flex-col justify-between h-full min-h-[400px] overflow-auto">
                <div className="overflow-auto">
                  {animalCareList.map((animalCare) => {
                    if (animalCare.animals.length === 0) return null;
                    return (
                      <>
                        <div
                          key={animalCare.id}
                          className={`w-full transition-all duration-500 ${
                            selectedAnimalCare === animalCare.id
                              ? "bg-slate-600 h-48"
                              : "bg-white h-24"
                          }`}
                        >
                          {animalCare.animals.map((animal) => (
                            <div className="inline-block">
                              <p>{animal.name}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="w-full h-32 bg-black">Test</div>
              </div>
            </SideMenu>
          </div>
        </>
      )}
    </>
  );
}
