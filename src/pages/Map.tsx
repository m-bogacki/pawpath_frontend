import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";
import AnimalCareMarkerList from "../features/map/componenets/animalCare/AnimalCareMarkerList";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
  faArrowLeft,
  faChevronLeft,
  faHamburger,
  faX,
} from "@fortawesome/free-solid-svg-icons";

export default function Map() {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("rerender");
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
        >
          <AnimalCareMarkerList />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
        <div
          className={`w-[400px] h-full z-40 absolute top-0 right-0 ${
            menuOpen && "translate-x-[350px]"
          } transition-transform duration-500 ease-in-out bg-white`}
        >
          <div className="min-h-[80px] w-screen bg-transparent z-30">
            <div className="w-full">
              {" "}
              <FontAwesomeIcon
                className={`ml-1 p-3 text-2xl cursor-pointer text-secondAccent ${
                  !menuOpen && "rotate-180"
                } transition-all duration-300 ease-in-out`}
                icon={faChevronLeft}
                onClick={() => {
                  toggleMenu(false);
                }}
              ></FontAwesomeIcon>
            </div>
            <div className="w-full h-24 bg-black"></div>
          </div>
        </div>
      </div>
    </>
  );
}
