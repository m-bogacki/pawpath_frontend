import HoverSlideButton from "../../../components/HoverSlideButton";
import { TAnimal } from "../../../types/Animal";

export default function AnimalCard({
  animal,
  onDelete,
}: {
  animal: TAnimal;
  onDelete: (animal: TAnimal) => void;
}) {
  return (
    <div
      className="w-[80%] w-[400px] bg-gray-400 rounded-2xl hover:backdrop-blur-md hover:shadow-xl hover:bg-gray-200 transition-all overflow-hidden"
      key={animal.id?.toString()}
    >
      <img
        className="w-full object-top object-cover h-[50%]"
        src="/golden.jpg"
        alt=""
        draggable="false"
      />
      <div className="flex flex-col h-[50%] items-center justify-between">
        <h3>{animal.name}</h3>
        <div className="flex justify-evenly ">
          <HoverSlideButton
            onClick={() => {}}
            label="Edit"
            bgColor={"bg-red-700"}
          />
          <HoverSlideButton onClick={() => onDelete(animal)} label="Delete" />
        </div>
      </div>
    </div>
  );
}
