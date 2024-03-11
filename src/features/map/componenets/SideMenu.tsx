import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import HoverSlideButton from "../../../components/HoverSlideButton";
import NewAnimalForm from "./NewAnimalCareForm";
import { useNavigate } from "react-router-dom";
import SideMenuItem from "./SideMenuItem";

type SideMenuProps = {
  selectedAnimalCare: number | undefined;
};

export default function SideMenu({ selectedAnimalCare }: SideMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const loggedUser = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const animalCareList = useAppSelector(
    (state) => state.animalCare.animalCareList
  );

  const userHaveAddress = loggedUser?.address !== null;

  return (
    <>
      <div
        className={`sm:w-[400px] w-screen z-40 overflow-auto absolute top-0 right-0 bottom-0 ${
          menuOpen ? "translate-x-[0px]" : "translate-x-[91%]"
        } transition-transform duration-500 ease-in-out bg-neutral text-neutral flex flex-col`}
      >
        <div className="w-full">
          <FontAwesomeIcon
            className={`ml-1 p-3 text-2xl cursor-pointer text-accent ${
              menuOpen && "rotate-180"
            } transition-all duration-300 ease-in-out`}
            icon={faChevronLeft}
            onClick={() => {
              setMenuOpen((prevState) => !prevState);
            }}
          ></FontAwesomeIcon>
        </div>
        <div className="justify-between min-h-[400px] overflow-auto flex-grow">
          <div className="overflow-auto divide-y  px-6 divide-slate-500 d">
            {animalCareList.map((animalCare) => {
              if (animalCare.animals.length === 0) return null;
              return (
                <SideMenuItem
                  key={animalCare.id}
                  animalCare={animalCare}
                  navigate={navigate}
                  selectedAnimalCare={selectedAnimalCare}
                ></SideMenuItem>
              );
            })}
          </div>
        </div>
        {userHaveAddress ? (
          <div className="w-full flex flex-col justify-evenly items-center py-4">
            <div
              className={`w-full ${
                formOpen ? "h-[320px]" : "h-0"
              } overflow-hidden transition-all duration-500 ease-in-out px-10`}
            >
              <NewAnimalForm
                onClose={() => {
                  setFormOpen(false);
                }}
              />
            </div>
            <div className="flex w-full items-center justify-evenly">
              <HoverSlideButton
                onClick={() => {
                  setFormOpen(true);
                }}
              >
                Add
              </HoverSlideButton>
              <HoverSlideButton
                className={`${
                  formOpen ? "scale-100" : "scale-0 "
                } transition-all`}
                onClick={() => {
                  setFormOpen(false);
                }}
              >
                Close Form
              </HoverSlideButton>
            </div>
          </div>
        ) : (
          <p className="text-center m-6 p-2 text-error shadow-md shadow-secondary rounded-lg">
            Please add your address to add new animal care
          </p>
        )}
      </div>
    </>
  );
}
