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
    <NavLink
      to={redirectTo}
      className="relative text-acc before:transition-transform before:absolute before:h-14 before:w-28 before:bg-accent before:left-12 before:top-3 hover:before:translate-x-[22px]"
    >
      <FontAwesomeIcon className="h-6 w-6 z-10" icon={icon} />
      <span className="z-10">{label}</span>
    </NavLink>
  );
}
