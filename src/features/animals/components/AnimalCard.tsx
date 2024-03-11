import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HoverSlideButton from "../../../components/HoverSlideButton";
import { TAnimal } from "../../../Types/Animal";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function AnimalCard({
  animal,
  onDelete,
}: {
  animal: TAnimal;
  onDelete: (animal: TAnimal) => void;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="w-full md:w-[300px] h-[400px] bg-neutral rounded-lg shadow-[0px_20px_30px_3px] sm:shadow-secondary/40 transition-all overflow-hidden"
        key={animal.id?.toString()}
      >
        <img
          className="w-full object-top object-cover h-[50%]"
          src={animal.image}
          alt=""
          draggable="false"
        />
        <div className="flex flex-col h-[50%] items-center justify-evenly">
          <div className="flex-grow grid grid-cols-2 gap-x-3 pt-4 text-xl">
            <div className="flex flex-col items-end w-full ">
              <p>Name:</p>
              <p>Species:</p>
              <p>Weight:</p>
            </div>
            <div className="w-full">
              <p>{animal.name}</p>
              <p>{animal.species}</p>
              <p>{animal.weight} KG</p>
            </div>
          </div>
          <div className="flex w-full justify-evenly mb-4">
            <HoverSlideButton
              onClick={() => {
                navigate(`/animals/${animal.id}`, { state: animal });
              }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </HoverSlideButton>
            <HoverSlideButton onClick={() => onDelete(animal)}>
              <FontAwesomeIcon icon={faTrash} />
            </HoverSlideButton>
          </div>
        </div>
      </div>
    </>
  );
}
