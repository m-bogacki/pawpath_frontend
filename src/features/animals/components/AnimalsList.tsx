import { TAnimal } from "../../../types/Animal";
import AnimalCard from "./AnimalCard";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { deleteAnimal } from "../../../store/animalsSlice";
import useFetch from "../../../custom_hooks/useFetch";

export default function AnimalList({ animals }: { animals: TAnimal[] }) {
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const { loading, error, sendRequest } = useFetch<TAnimal[]>();
  const handleDelete = (animal: TAnimal) => {
    sendRequest({
      url: `animals/${animal.id?.toString()}`,
      method: "DELETE",
    });
    dispatch(deleteAnimal(animal));
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-y-12 align-middle w-full">
        {animals.map((animal, index) => {
          return (
            <AnimalCard
              key={animal.id?.toString()}
              animal={animal}
              onDelete={handleDelete}
            />
          );
        })}
      </div>
    </>
  );
}
