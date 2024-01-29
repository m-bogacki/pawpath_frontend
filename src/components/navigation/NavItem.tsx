import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export default function NavItem({
  icon,
  label,
  redirectTo,
}: {
  icon: IconDefinition;
  label?: string;
  redirectTo: string;
}) {
  return (
    <NavLink to={redirectTo}>
      <FontAwesomeIcon
        className="h-6 w-6  hover:text-secondAccent"
        icon={icon}
      />
      {label}
    </NavLink>
  );
}
