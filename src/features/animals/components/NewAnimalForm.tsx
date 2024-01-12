import { useForm, SubmitHandler } from "react-hook-form";
import { TAnimal } from "../../../types/Animal";
import { ComponentProps } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutsideAlerter from "../../../custom_hooks/OutsideAlerter";
import useFetch from "../../../custom_hooks/useFetch";
import { AppDispatch } from "../../../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { addAnimal } from "../../../store/animalsSlice";

export default function NewAnimalForm({ onClose }: ComponentProps<any>) {
  const dispatch: AppDispatch = useDispatch<Dispatch>();
  const { loading, error, requestData, sendRequest } = useFetch<TAnimal>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAnimal>();
  const onSubmit: SubmitHandler<TAnimal> = async (data) => {
    sendRequest(
      {
        url: "animals/create/",
        method: "POST",
        data: JSON.stringify(data, (key, value) => {
          if (key === "owner" || key === "weight") {
            return parseInt(value);
          }
          return value;
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      (animal) => {
        if (animal) return dispatch(addAnimal(animal));
        return;
      }
    );
    onClose();
  };

  return (
    <div
      className={`absolute flex top-0 left-0 justify-center items-center w-screen h-screen bg-slate-800 backdrop-blur-md bg-opacity-30 z-50`}
    >
      <OutsideAlerter onClickOutside={onClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" bg-darkText flex flex-col gap-2 text-background rounded-2xl"
        >
          <span className="flex items-center gap-10">
            <label htmlFor="name" className="max-w-[30px]">
              Name
            </label>
            <input {...register("name")} name="name" required />
          </span>
          <span className="flex items-center gap-10">
            <label htmlFor="weight" className="max-w-[30px]">
              Weight
            </label>
            <input {...register("weight")} name="weight" required />
          </span>
          <span className="flex items-center  gap-10">
            <label htmlFor="name" className="max-w-[30px]">
              Owner
            </label>
            <input
              type="number"
              defaultValue={1}
              {...register("owner", { required: true })}
              name="owner"
              required
            />
          </span>
          <span className="flex items-center  gap-10">
            <label htmlFor="species" className="max-w-[30px]">
              Species
            </label>
            <select {...register("species")} name="species" className="w-full">
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </span>
          <button
            type="submit"
            className="border-solid border-secondAccent border-2 rounded-md  hover:bg-black hover:text-background cursor-pointer mt-5"
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              "Prześlij"
            )}
          </button>
        </form>
      </OutsideAlerter>
    </div>
  );
}
