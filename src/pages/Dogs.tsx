import { useState } from "react";
import useFetch from "../custom_hooks/useFetch";
import NewAnimalForm from "../features/dogs/NewAnimalForm";
import OutsideAlerter from "../custom_hooks/OutsideAlerter";

export default function Dogs() {
  const { data, loading, error } = useFetch("dogs", "GET");
  const [dogs, setDogs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const onClose = (): void => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-[10%] w-full flex items-center justify-end pr-8">
        <button
          className="w-32 h-12 rounded-lg relative bg-transparent overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <span className="w-[calc(100%_+_60px)] absolute h-full top-0 left-[-50px] bg-secondAccent sm:bg-gradient-to-r sm:from-secondAccent from-50% sm:to-slate-100 sm:to-100% z-20 sm:hover:translate-x-[45px] transition-transform duration-500">
            <div className="bg-transparent h-full w-full top-0 left-0 flex justify-center items-center absolute z-30">
              Add Dog
            </div>
          </span>
        </button>
      </div>
      <div className="h-full w-full p-8"></div>

      {isOpen && <NewAnimalForm onClose={onClose}></NewAnimalForm>}
    </>
  );
}
