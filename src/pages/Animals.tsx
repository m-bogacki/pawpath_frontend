import NewAnimalForm from "../features/animals/components/NewAnimalForm";
import HoverSlideButton from "../components/HoverSlideButton";
import AnimalList from "../features/animals/components/AnimalsList";
import { useAppSelector } from "../store/hooks";
import { useEffect, useState } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchAnimals } from "../store/animalsSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import PageFunctionalTopBar from "../components/PageFunctionalTopBar";

export default function Animals() {
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const [newAnimalFormOpen, setNewAnimalFormOpen] = useState(false);
  const loading = useAppSelector((state) => state.animals.isLoading);
  const animals = useAppSelector((state) => state.animals.animals);

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  return (
    <>
      <PageFunctionalTopBar label="My Animals">
        <HoverSlideButton onClick={() => setNewAnimalFormOpen(true)}>
          Add dog
        </HoverSlideButton>
      </PageFunctionalTopBar>
      {loading && <LoadingSpinner />}
      {!loading && animals && (
        <>
          <div className="h-full w-full flex justify-center overflow-auto">
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
