import { FieldValues, useForm } from "react-hook-form";
import PageFunctionalTopBar from "../components/PageFunctionalTopBar";
import FormInput from "../components/forms/FormInput";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  setAnimalImage,
  fetchAnimal,
  updateAnimal,
  updateAnimalCareInstructions,
} from "../store/animalsSlice";
import CenteredForm from "../components/forms/CenteredForm";

export default function AnimalEdit() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.animals.isLoading);
  const viewedAnimal = useAppSelector((state) => state.animals.viewedAnimal);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchViewedAnimal = async () => {
      dispatch(fetchAnimal(parseInt(id!)));
    };
    fetchViewedAnimal();
  }, [dispatch, id]);

  const onSubmit = async (data: FieldValues) => {
    const careIntructions = data.care_intructions;
    delete data.care_intructions;
    if (!viewedAnimal?.image.startsWith("http"))
      data.image = viewedAnimal?.image;
    const animalData = {
      ...data,
    };
    delete animalData.size;
    await dispatch(
      updateAnimal({ animalId: parseInt(id!), animal: animalData })
    );
    await dispatch(
      updateAnimalCareInstructions({
        animalId: parseInt(id!),
        careInstructions: careIntructions,
      })
    );
  };

  return (
    <main className="flex flex-col h-full items-center">
      <PageFunctionalTopBar label={`${viewedAnimal?.name ?? ""}`} />
      <CenteredForm handleSubmit={handleSubmit(onSubmit)} loading={loading}>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-20">
          <img
            src={viewedAnimal?.image}
            alt="Animal"
            className="avatar object-top object-cover h-72 w-60 rounded-md border-2 border-secondary"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={(event) => {
              const file = event.target.files?.item(0);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64String = reader.result as string;
                  dispatch(setAnimalImage(base64String));
                  // Perform further operations with the base64String
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <label
            htmlFor="fileInput"
            className="btn bg-accent text-accent-content"
          >
            Upload File
          </label>
        </div>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 p-12 justify-center light:bg-[#f0f0f0]">
          <div className="flex flex-col min-w-[334px] gap-4">
            <FormInput
              identifier="name"
              defaultValue={viewedAnimal?.name}
              register={register}
              type="text"
              label="Name"
            />
            <span className="flex items-center">
              <label
                htmlFor="species"
                className="flex items-center text-nowrap mr-5 min-w-[80px]"
              >
                Species
              </label>
              <select
                {...register("species")}
                name="species"
                className={`mt-1 p-2 mr-3  w-full`}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
            </span>
            <FormInput
              identifier="weight"
              register={register}
              type="number"
              label="Weight"
              defaultValue={viewedAnimal?.weight}
            />
            <FormInput
              identifier="size"
              register={register}
              type="text"
              label="Size"
              defaultValue={viewedAnimal?.size}
            />
          </div>
          <div className="flex flex-col min-w-[334px]  gap-4">
            <FormInput
              identifier="care_intructions.food_amount"
              register={register}
              type="number"
              label="Food amount (grams)"
              textWrap
              defaultValue={viewedAnimal?.care_instructions?.food_amount}
            />
            <FormInput
              identifier="care_intructions.food_portions"
              register={register}
              type="number"
              label="Food portions"
              textWrap
              defaultValue={viewedAnimal?.care_instructions?.food_portions}
            />
            <FormInput
              identifier="care_intructions.number_of_walks_per_day"
              register={register}
              type="number"
              label="Walks per day"
              textWrap
              defaultValue={
                viewedAnimal?.care_instructions?.number_of_walks_per_day
              }
            />
            <FormInput
              identifier="care_intructions.additional_instructions"
              register={register}
              type="textarea"
              label="Intructions"
              textWrap
              defaultValue={
                viewedAnimal?.care_instructions?.additional_instructions
              }
            />
          </div>
        </div>
      </CenteredForm>
    </main>
  );
}
