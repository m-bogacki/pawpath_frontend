import { TAnimal } from "../../../Types/Animal";
import AnimalCard from "./AnimalCard";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { deleteAnimal } from "../../../store/animalsSlice";

export default function AnimalList({ animals }: { animals: TAnimal[] }) {
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const handleDelete = (animal: TAnimal) => {
    dispatch(deleteAnimal(animal));
  };

  return (
    <>
      <div className="lg:p-32 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-y-12 gap-x-20">
        {animals.map((animal, index) => {
          return (
            <AnimalCard key={index} animal={animal} onDelete={handleDelete} />
          );
        })}
      </div>
    </>
  );
}
