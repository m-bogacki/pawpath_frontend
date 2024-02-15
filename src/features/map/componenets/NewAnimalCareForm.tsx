import { useForm, SubmitHandler } from "react-hook-form";
import { TAnimalCare } from "../../../Types/Animal";
import { ComponentProps, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../store/hooks";
import HoverSlideButton from "../../../components/HoverSlideButton";
import PopupModal from "../../../components/PopupModal";
import { addAnimalCare } from "../../../store/animalCareSlice";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import FormInput from "../../../components/forms/FormInput";

const animatedComponents = makeAnimated();

export default function NewAnimalForm({ onClose }: ComponentProps<any>) {
  const isLoading = useAppSelector((state) => state.animals.isLoading);
  const animals = useAppSelector((state) => state.animals.animals);
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const { register, handleSubmit } = useForm<TAnimalCare>();
  const [selectedAnimals, setSelectedAnimals] = useState<any>([]);
  const onSubmit: SubmitHandler<TAnimalCare> = async (data) => {
    data.animals = selectedAnimals;
    dispatch(addAnimalCare(data));
    console.log(data);
    onClose();
  };

  return (
    <PopupModal onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-darkText flex flex-col gap-1 text-background rounded-2xl"
      >
        <span className="flex items-center">
          <label htmlFor="name" className="w-[100px]">
            Animals
          </label>
          <Select
            className="w-full text-neutral "
            isMulti
            options={animals.map((animal) => ({
              value: animal.id,
              label: animal.name,
            }))}
            inputId="animals"
            components={animatedComponents}
            closeMenuOnSelect={false}
            onChange={(value) => {
              setSelectedAnimals(value.map((v: any) => v.value));
            }}
          />
        </span>
        <FormInput
          identifier="start_date"
          label="Start date"
          className="text-secondary w-full"
          register={register}
          type="datetime-local"
        />
        <FormInput
          identifier="end_date"
          label="End date"
          className="text-secondary w-full"
          register={register}
          type="datetime-local"
        />
        <HoverSlideButton type="submit" disabled={isLoading} className="mt-5">
          {isLoading ? (
            <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
          ) : (
            "Prześlij"
          )}
        </HoverSlideButton>
      </form>
    </PopupModal>
  );
}
