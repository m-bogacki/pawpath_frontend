import React from "react";
import HoverSlideButton from "../../../components/HoverSlideButton";
import { deleteAnimalCare } from "../../../store/animalCareSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";

type AnimalCareDeleteButtonProps = {
  animalCareId: string;
};

export default function AnimalCareDeleteButton({
  animalCareId,
}: AnimalCareDeleteButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <HoverSlideButton
      onClick={() => {
        dispatch(deleteAnimalCare(parseInt(animalCareId)));
        navigate("/map");
      }}
    >
      Delete
    </HoverSlideButton>
  );
}
