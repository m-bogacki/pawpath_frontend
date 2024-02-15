import { useParams, useLocation, useNavigate } from "react-router-dom";
import { TAnimal, TAnimalCare } from "../Types/Animal";
import PageFunctionalTopBar from "../components/PageFunctionalTopBar";
import HoverSlideButton from "../components/HoverSlideButton";
import { useAppDispatch } from "../store/hooks";
import { deleteAnimalCare } from "../store/animalCareSlice";

export default function AnimalCareEdit() {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as TAnimalCare;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  console.log(state);
  return (
    <>
      <PageFunctionalTopBar label="My Animals">
        <HoverSlideButton
          onClick={() => {
            id && dispatch(deleteAnimalCare(parseInt(id)));
            navigate("/map");
          }}
        >
          Delete
        </HoverSlideButton>
      </PageFunctionalTopBar>
      <div className="flex h-full mx-12 my-24 rounded-lg overflow-hidden divide-x">
        <div className="w-3/4 h-full p-10">
          <h1 className="text-4xl">Animal Care Edit</h1>
          <div>
            {state.animals.map((animal: TAnimal) => (
              <p key={animal.id}>{animal.name}</p>
            ))}
          </div>
        </div>
        <div className="flex-grow h-full">
          <div className="flex flex-col">
            {state.offers.map((offer) => {
              return (
                <div key={offer.id} className="flex">
                  <p>
                    {offer.carrer.first_name} {offer.carrer.last_name}
                  </p>
                  <p>{offer.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
