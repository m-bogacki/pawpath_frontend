import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  deleteAnimalCare,
  fetchAnimalCare,
  makeOffer,
} from "../store/animalCareSlice";
import { TAnimal, TAnimalCare, TOffer } from "../Types/Animal";
import PageFunctionalTopBar from "../components/PageFunctionalTopBar";
import HoverSlideButton from "../components/HoverSlideButton";
import AnimalCareOfferCard from "../features/animalCare/components/AnimalCareOfferCard";

export default function AnimalCareEdit() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector((state) => state.animalCare.isLoading);
  const viewedAnimalCare = useAppSelector(
    (state) => state.animalCare.viewedAnimalCare
  );
  const loggedUser = useAppSelector((state) => state.auth.user);
  const isOwner = useMemo(() => {
    return (
      loggedUser?.id === location.state?.animals[0].owner.id ||
      loggedUser?.role === 3
    );
  }, [loggedUser, location.state]);

  useEffect(() => {
    dispatch(fetchAnimalCare(parseInt(id!)));
  }, [dispatch, id]);

  const acceptedOffer = useMemo(() => {
    return viewedAnimalCare?.offers.find(
      (offer) => offer.status === "Accepted"
    );
  }, [viewedAnimalCare]);

  const handleDelete = useCallback(async () => {
    if (id) {
      await dispatch(deleteAnimalCare(parseInt(id)));
      navigate("/map");
    }
  }, [id, dispatch, navigate]);

  const handleMakeOffer = useCallback(() => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal();
  }, []);

  const handleSubmitOffer = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const description = formData.get("description") as Partial<TOffer>;
      const animalCareId = parseInt(id!);
      await dispatch(makeOffer({ animalCareId, description }));
    },
    [dispatch, id]
  );

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && (
        <div>
          <PageFunctionalTopBar label={`Animal Care`}>
            {isOwner ? (
              <HoverSlideButton onClick={handleDelete}>Delete</HoverSlideButton>
            ) : (
              viewedAnimalCare?.status === "New" && (
                <HoverSlideButton onClick={handleMakeOffer}>
                  Make Offer
                </HoverSlideButton>
              )
            )}
          </PageFunctionalTopBar>
          <div className="flex flex-col lg:flex-row mx-8 my-24 rounded-lg overflow-hidden lg:divide-x max-lg:divide-y">
            <div className="w-full lg:w-[65%] h-full p-3">
              <h1 className="text-4xl">Animal Care Edit</h1>
              <div>
                {viewedAnimalCare &&
                  viewedAnimalCare.animals.map((animal: TAnimal) => (
                    <p key={animal.id}>{animal.name}</p>
                  ))}
                {viewedAnimalCare?.status}
              </div>
            </div>
            <div className="lg:w-[35%] h-full p-3">
              {viewedAnimalCare && viewedAnimalCare.status === "New" ? (
                <>
                  <h1 className="text-4xl mb-5 ml-10">Offers</h1>
                  {viewedAnimalCare.offers.map((offer) => {
                    return (
                      <AnimalCareOfferCard
                        key={offer.id}
                        isOwner={isOwner}
                        loggedUser={loggedUser!}
                        offer={offer}
                      ></AnimalCareOfferCard>
                    );
                  })}
                </>
              ) : (
                <>
                  <h1 className="text-4xl mb-5 ml-10">Accepted Offer</h1>
                  {acceptedOffer && (
                    <AnimalCareOfferCard
                      isOwner={isOwner}
                      loggedUser={loggedUser!}
                      offer={acceptedOffer}
                    ></AnimalCareOfferCard>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form
            action="POST"
            className="flex flex-col"
            onSubmit={handleSubmitOffer}
          >
            <textarea
              className="resize-none"
              name="description"
              id="description"
              cols={30}
              rows={4}
            ></textarea>
            <button type="submit">Send Offer</button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
