import NewAnimalForm from "../features/animals/components/NewAnimalForm";
import HoverSlideButton from "../components/HoverSlideButton";
import AnimalList from "../features/animals/components/AnimalsList";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { TAnimal } from "../Types/Animal";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchAnimals } from "../store/animalsSlice";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Animals() {
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const [newAnimalFormOpen, setNewAnimalFormOpen] = useState(false);
  const loading = useAppSelector((state) => state.animals.isLoading);

  const animals: TAnimal[] = useAppSelector((state) => state.animals.animals);
  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  return (
    <>
      <div className="h-[10%] min-h-[80px] w-full flex items-center justify-between pr-8">
        <div className="h-full w-[300px] bg-white"></div>
        <HoverSlideButton
          onClick={() => setNewAnimalFormOpen(true)}
          label="Add Dog"
        ></HoverSlideButton>
      </div>
      {loading && <LoadingSpinner />}
      {!loading && (
        <>
          <div className="h-full w-full flex justify-center items-center">
            <AnimalList animals={animals} />
          </div>
        </>
      )}

      {newAnimalFormOpen && (
        <NewAnimalForm
          onClose={() => {
            setNewAnimalFormOpen(false);
          }}
        ></NewAnimalForm>
      )}
    </>
  );
}
