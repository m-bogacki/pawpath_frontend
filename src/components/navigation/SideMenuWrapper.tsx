import { ReactNode } from "react";

type Props = {
  menuOpen: boolean;
  children: ReactNode;
};

const SideMenuWrapper = ({ menuOpen, children }: Props) => {
  return (
    <>
      <div
        className={`flex flex-col absolute top-0 left-0 min-h-screen justify-between items-center ${
          menuOpen ? "translate-x-0" : "translate-x-[-100rem]"
        } px-1 pt-20 text-secondary bg-neutral z-20 w-screen sm:w-[300px]  transition-transform duration-500 ease-in-out`}
      >
        {children}
      </div>
    </>
  );
};

export default SideMenuWrapper;
