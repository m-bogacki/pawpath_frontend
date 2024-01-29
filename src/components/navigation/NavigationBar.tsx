/* eslint-disable jsx-a11y/alt-text */
import {
  faGear,
  faDog,
  faHome,
  faX,
  faHamburger,
  faMap,
  faSignOut,
  faSignIn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import OutsideAlerter from "../../custom_hooks/OutsideAlerter";
import ThemeSwitcher from "./ThemeSwitcher";
import NavItem from "./NavItem";

import Footer from "../Footer";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import SideMenuWrapper from "./SideMenuWrapper";
import UserAvatar from "./UserAvatar";
import { logout } from "../../store/authSlice";

export default function NavigationBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const toggleMenu = (outsideClick: boolean) => {
    if (outsideClick && !menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen((prevState) => !prevState);
    }
  };

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

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
          {isAuthenticated && <UserAvatar />}
        </div>
        {/* END Top Bar */}

        {/* Side Menu */}

        <SideMenuWrapper menuOpen={menuOpen}>
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
              <hr />
              {isAuthenticated ? (
                <NavItem icon={faUser} label="User" redirectTo="/myAccount" />
              ) : (
                <>
                  <NavItem
                    icon={faSignIn}
                    label="Login"
                    redirectTo="/auth?mode=login"
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            {isAuthenticated && (
              <>
                <FontAwesomeIcon
                  className="h-7 w-7 mb-3 p-3 lg:hover:rotate-45 lg:hover:text-secondAccent duration-300 lg:transition-all cursor-pointer"
                  icon={faGear}
                />

                <button onClick={handleLogout}>
                  <FontAwesomeIcon
                    className="h-7 w-7 mb-3 p-3 lg:hover:text-secondAccent"
                    icon={faSignOut}
                  />
                </button>
              </>
            )}
            <ThemeSwitcher></ThemeSwitcher>
            <Footer />
          </div>
        </SideMenuWrapper>
        {/* END Side Menu */}
      </nav>
    </OutsideAlerter>
  );
}
