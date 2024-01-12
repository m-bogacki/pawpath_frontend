/* eslint-disable jsx-a11y/alt-text */
import {
  faGear,
  faDog,
  faHome,
  faX,
  faHamburger,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import OutsideAlerter from "../custom_hooks/OutsideAlerter";
import ThemeSwitcher from "./ThemeSwitcher";
import NavItem from "./NavItem";

import Footer from "./Footer";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log("rerender");
  const toggleMenu = (outsideClick: boolean) => {
    if (outsideClick && !menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen((prevState) => !prevState);
    }
  };

  return (
    <OutsideAlerter onClickOutside={() => toggleMenu(true)}>
      <nav className="absolute top-0 z-50 bg-transparent ">
        {/* Top Bar */}
        <div className="flex relative justify-between items-center pr-10 min-h-[80px] w-screen bg-transparent z-30">
          <FontAwesomeIcon
            className="ml-7 p-3 text-2xl cursor-pointer text-secondAccent"
            icon={menuOpen ? faX : faHamburger}
            onClick={() => {
              toggleMenu(false);
            }}
          ></FontAwesomeIcon>

          <img
            draggable={false}
            className="h-14 w-14 ring-2 ring-white rounded-full bg-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="user avatar"
          />
        </div>
        {/* END Top Bar */}

        {/* Side Menu */}

        <div
          className={`flex flex-col absolute top-0 left-0 min-h-screen justify-between items-center ${
            menuOpen ? "translate-x-0" : "translate-x-[-100rem]"
          } px-1 pt-20 text-background bg-darkText z-20 w-screen sm:w-[300px]  transition-transform duration-500 ease-in-out`}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="nav-links flex flex-col items-center justify-center mr-1 lg:transition-transform">
              <NavItem icon={faHome} label="Home" redirectTo="/"></NavItem>
              <hr />
              <NavItem
                icon={faDog}
                label="My Dogs"
                redirectTo="/dogs"
              ></NavItem>
              <hr />
              <NavItem icon={faMap} label="Map" redirectTo="/map" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon
              className="h-7 w-7 mb-3 p-3 lg:hover:rotate-45 lg:hover:text-secondAccent duration-300 lg:transition-all cursor-pointer"
              icon={faGear}
            />
            <ThemeSwitcher></ThemeSwitcher>
            <Footer />
          </div>
        </div>
        {/* END Side Menu */}
      </nav>
    </OutsideAlerter>
  );
}
