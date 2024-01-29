import NewAnimalForm from "../features/animals/components/NewAnimalForm";
import HoverSlideButton from "../components/HoverSlideButton";
import AnimalList from "../features/animals/components/AnimalsList";
import { useAppSelector } from "../store/hooks";
import useFetch from "../custom_hooks/useFetch";
import { useEffect, useState } from "react";
import { TAnimal } from "../Types/Animal";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setAnimals } from "../store/animalsSlice";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Animals() {
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const [newAnimalFormOpen, setNewAnimalFormOpen] = useState(false);

  const animals: TAnimal[] = useAppSelector((state) => state.animals.animals);
  const { loading, error, sendRequest } = useFetch<TAnimal[]>();
  useEffect(() => {
    sendRequest(
      {
        url: "animals/",
        method: "GET",
      },
      (animalsData) => {
        if (animalsData) return dispatch(setAnimals(animalsData));
        return;
      }
    );
  }, [dispatch, sendRequest]);

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
            {error && <h1>DUPA</h1>}
            {!error && <AnimalList animals={animals} />}
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
