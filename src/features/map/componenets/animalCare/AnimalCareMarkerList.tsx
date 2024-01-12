import { TAnimalCare } from "../../../../types/Animal";
import { useEffect, useState } from "react";
import AnimalCareMarker from "./AnimalCareMarker";

export default function AnimalCareMarkerList() {
  const [animalCareList, setAnimalCareList] = useState<TAnimalCare[]>([]);

  return (
    <>
      {animalCareList.map((animalCare) => {
        return <AnimalCareMarker key={animalCare.id} animalCare={animalCare} />;
      })}
    </>
  );
}
