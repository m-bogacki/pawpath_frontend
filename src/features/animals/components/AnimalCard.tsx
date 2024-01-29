import HoverSlideButton from "../../../components/HoverSlideButton";
import { TAnimal } from "../../../Types/Animal";

export default function AnimalCard({
  animal,
  onDelete,
}: {
  animal: TAnimal;
  onDelete: (animal: TAnimal) => void;
}) {
  return (
    <div
      className="w-[80%] md:w-[300px] h-[400px] bg-neutral rounded-lg hover:backdrop-blur-md shadow-sm hover:shadow-lg transition-all overflow-hidden"
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
        <h3>{animal.id}</h3>

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
