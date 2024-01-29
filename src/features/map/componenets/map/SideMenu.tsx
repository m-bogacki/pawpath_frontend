import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropsWithChildren, useState } from "react";

export default function SideMenu({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`sm:w-[400px] w-screen z-40 absolute top-0 right-0 bottom-0 ${
        menuOpen ? "translate-x-[0px]" : "translate-x-[87%]"
      } transition-transform duration-500 ease-in-out bg-white`}
    >
      <div className="min-h-[80px] h-full w-full bg-transparent z-30">
        <div className="w-full">
          <FontAwesomeIcon
            className={`ml-1 p-3 text-2xl cursor-pointer text-secondAccent ${
              menuOpen && "rotate-180"
            } transition-all duration-300 ease-in-out`}
            icon={faChevronLeft}
            onClick={() => {
              setMenuOpen((prevState) => !prevState);
            }}
          ></FontAwesomeIcon>
        </div>
        {children}
      </div>
    </div>
  );
}
