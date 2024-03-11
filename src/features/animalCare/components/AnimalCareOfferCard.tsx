import { useCallback } from "react";
import { TOffer } from "../../../Types/Animal";
import { TUser } from "../../../Types/User";
import HoverSlideButton from "../../../components/HoverSlideButton";
import { useAppDispatch } from "../../../store/hooks";
import { acceptOffer } from "../../../store/animalCareSlice";

type AnimalCareOfferCardProps = {
  offer: TOffer;
  isOwner: boolean;
  loggedUser: TUser;
};

export default function AnimalCareOfferCard({
  offer,
  isOwner,
  loggedUser,
}: AnimalCareOfferCardProps) {
  const dispatch = useAppDispatch();

  const handleOfferAccept = useCallback(async () => {
    const handleDispatch = async () => {
      dispatch(acceptOffer(offer.id!));
    };
    handleDispatch();
  }, [dispatch, offer.id]);

  const handleOfferDecline = useCallback(async () => {
    console.log("Offer declined");
  }, []);

  return (
    <div
      key={offer.id}
      className="collapse collapse-arrow bg-base-200 mb-3 shadow-md shadow-secondary/40"
    >
      <input
        type="checkbox"
        disabled={loggedUser?.id !== offer.carrer.id && !isOwner}
        name="my-accordion-1"
      />
      <div className="collapse-title text-xl font-medium">
        <p>
          {offer.carrer.first_name} {offer.carrer.last_name}
        </p>
      </div>
      <div className="collapse-content">
        <div>
          <p>Offer Description: {offer.description}</p>
          <h2>Status: {offer.status}</h2>
        </div>
        {isOwner && offer.status !== "Accepted" && (
          <div className="flex justify-evenly mt-5">
            <HoverSlideButton onClick={handleOfferAccept}>
              Accept
            </HoverSlideButton>
            <HoverSlideButton onClick={handleOfferDecline}>
              Decline
            </HoverSlideButton>
          </div>
        )}
      </div>
    </div>
  );
}
