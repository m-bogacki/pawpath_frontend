import React from "react";
import { useAppSelector } from "../store/hooks";

export default function Footer() {
  const loggedUser = useAppSelector((state) => state.auth.user);
  return (
    <div className="flex items-center justify-center left-0 bottom-0 h-10 w-full text-white">
      {loggedUser && `${loggedUser?.first_name} ${loggedUser?.last_name}`}
    </div>
  );
}
