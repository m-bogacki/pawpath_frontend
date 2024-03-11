import React from "react";
import { TAnimalCare } from "../../../Types/Animal";
import HoverSlideButton from "../../../components/HoverSlideButton";

interface SideMenuItemProps {
  animalCare: TAnimalCare;
  selectedAnimalCare: number | null | undefined;
  navigate: (path: string, state: any) => void;
}

const onClickViewHandle = (animalCare: TAnimalCare, navigate: any) => {
  navigate(`/animalCare/${animalCare.id}`, {
    state: animalCare,
  });
};

const SideMenuItem: React.FC<SideMenuItemProps> = ({
  animalCare,
  selectedAnimalCare,
  navigate,
}) => {
  return (
    <>
      <div
        className={`flex overflow-hidden transition-all duration-500 ${
          selectedAnimalCare === animalCare.id
            ? "h-32first:rounded-t-lg last:rounded-b-lg"
            : "h-24"
        }`}
      >
        <div className="flex w-3/4 text-secondary p-4">
          <div className="w-full">
            <p className="font-bold">Animals</p>
            {animalCare.animals.map((animal) => (
              <p key={animal.id}>{animal.name}</p>
            ))}
          </div>
          <div className="w-full">
            <p className="font-bold">Owner</p>
            <p>
              {`${animalCare.animals[0].owner.first_name}
             ${animalCare.animals[0].owner.last_name}`}
            </p>
          </div>
        </div>
        <div className="flex h-full flex-grow items-start p-4">
          <HoverSlideButton
            onClick={onClickViewHandle.bind(null, animalCare, navigate)}
          >
            View
          </HoverSlideButton>
        </div>
      </div>
    </>
  );
};

export default SideMenuItem;
