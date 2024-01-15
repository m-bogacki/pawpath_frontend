import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useFetch from "../custom_hooks/useFetch";
import { TAnimalCare } from "../types/Animal";
import { setAnimalCareList } from "../store/animalsSlice";
import AnimalCareMarker from "../features/map/componenets/animalCare/AnimalCareMarker";

export default function Map() {
  const dispatch = useAppDispatch();
  const animalCareList = useAppSelector((state) => state.animals.animalCare);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = (outsideClick: boolean) => {
    if (outsideClick && !menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen((prevState) => !prevState);
    }
  };

  return (
    <>
      <div className="w-full h-full max-h-screen max-w-screen overflow-hidden relative z-10">
        <MapContainer
          className="h-full z-20"
          center={[52.394142, 16.897701]}
          zoom={13}
          scrollWheelZoom={true}
          bounceAtZoomLimits={true}
          maxZoom={15}
        >
          {animalCareList.map((animalCare) => {
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
        <div
          className={`w-[400px] h-full z-40 translate-x-[350px] absolute top-0 right-0 ${
            menuOpen && "translate-x-[0]"
          } transition-transform duration-500 ease-in-out bg-white`}
        >
          <div className="min-h-[80px] w-screen bg-transparent z-30">
            <div className="w-full">
              <FontAwesomeIcon
                className={`ml-1 p-3 text-2xl cursor-pointer text-secondAccent ${
                  menuOpen && "rotate-180"
                } transition-all duration-300 ease-in-out`}
                icon={faChevronLeft}
                onClick={() => {
                  toggleMenu(false);
                }}
              ></FontAwesomeIcon>
            </div>
            {animalCareList.map((animalCare) => {
              return (
                <div
                  key={animalCare.id}
                  className={`w-full transition-all duration-500 ${
                    selectedAnimalCare === animalCare.id
                      ? "bg-slate-600 h-48"
                      : "bg-white h-24"
                  }`}
                >
                  <p>{animalCare.animal.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
