import { SubmitHandler, useForm } from "react-hook-form";
import { TUser } from "../Types/User";
import PageFunctionalTopBar from "../components/PageFunctionalTopBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import FormInput from "../components/forms/FormInput";
import HoverSlideButton from "../components/HoverSlideButton";
import countryList from "react-select-country-list";
import { useCallback, useMemo, useRef, useState } from "react";
import Select from "react-select";
import AddressPinMapDialog from "../features/myAccount/components/AddressPinMapDialog";
import { updateUserAddress, updateUserData } from "../store/authSlice";
import { TAddress } from "../Types/Address";

export default function MyAccount() {
  const loggedUser = useAppSelector((state) => state.auth.user);
  const { register, handleSubmit } = useForm<Partial<TUser>>();
  const countryRef = useRef({ value: "PL", label: "Poland" });
  const options = useMemo(() => countryList().getData(), []);
  const [loading, setLoading] = useState(false);

  const { latitude, longitude } = useMemo(
    () =>
      loggedUser?.address ?? {
        latitude: 53.42894,
        longitude: 16.9226,
      },
    [loggedUser?.address]
  );
  const markerPosition = useRef<[number, number]>([
    latitude as number,
    longitude as number,
  ]);
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<Partial<TUser>> = async (data) => {
    setLoading(true);
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
    };
    const lat = markerPosition.current[0];
    const lng = markerPosition.current[1];
    const userAddress: Partial<TAddress> = {
      street: data.address?.street!,
      city: data.address?.city!,
      country: countryRef.current.value,
      postal_code: data.address?.postal_code!,
      longitude: lng.toFixed(6),
      latitude: lat.toFixed(6),
    };
    if (loggedUser) {
      await dispatch(updateUserData({ userId: loggedUser.id, userData }));
      await dispatch(updateUserAddress({ userId: loggedUser.id, userAddress }));
    }
    setLoading(false);
  };
  const handleMarkerDragEnd = useCallback((latLng: any) => {
    markerPosition.current = [latLng.lat, latLng.lng];
  }, []);

  const changeHandler = useCallback((value: any) => {
    countryRef.current = value;
  }, []);

  return (
    <main className="flex flex-col h-full items-center">
      <PageFunctionalTopBar
        label={`${loggedUser?.first_name ?? ""} ${loggedUser?.last_name ?? ""}`}
      />
      <div className="flex justify-center items-center rounded-lg">
        <form
          action="POST"
          className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 p-12 justify-center light:bg-[#f0f0f0]"
        >
          <div className="flex flex-col min-w-[334px] gap-4">
            <FormInput
              identifier="first_name"
              defaultValue={loggedUser?.first_name}
              register={register}
              type="text"
              label="First Name"
            />
            <FormInput
              identifier="last_name"
              register={register}
              type="text"
              label="Last Name"
              defaultValue={loggedUser?.last_name}
            />
            <FormInput
              identifier="email"
              register={register}
              type="text"
              label="Email"
              defaultValue={loggedUser?.email}
            />
          </div>
          <div className="flex flex-col min-w-[334px]  gap-4">
            <FormInput
              identifier="address.street"
              register={register}
              type="text"
              label="Street"
              defaultValue={loggedUser?.address?.street}
            />
            <FormInput
              identifier="address.city"
              register={register}
              type="text"
              label="City"
              defaultValue={loggedUser?.address?.city}
            />
            <FormInput
              identifier="address.postal_code"
              register={register}
              type="text"
              label="Zip"
              defaultValue={loggedUser?.address?.postal_code}
            />
            <span className="flex items-center mt-1">
              <label htmlFor="name" className="w-[100px] text-secondary">
                Country
              </label>
              <Select
                className="z-50 text-neutral w-56"
                isMulti={false}
                options={options}
                value={options.find(
                  (option) => option.value === countryRef.current.value
                )}
                defaultValue={options.find(
                  (option) => option.value === loggedUser?.address?.country
                )}
                onChange={changeHandler}
              />
            </span>
            <HoverSlideButton
              className="w-80 mt-3"
              type="button"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_3"
                ) as HTMLDialogElement;
                modal.showModal();
              }}
            >
              Set Localization pin
            </HoverSlideButton>
          </div>
          <div className="w-full md:col-span-2 flex justify-center items-center">
            <HoverSlideButton
              onClick={handleSubmit(onSubmit)}
              className="mt-12 w-36"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </HoverSlideButton>
          </div>
        </form>
        <AddressPinMapDialog
          onDragEnd={handleMarkerDragEnd}
          markerPosition={markerPosition.current}
        />
      </div>
    </main>
  );
}
