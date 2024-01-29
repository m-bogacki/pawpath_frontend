import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function LoadingSpinner() {
  return (
    <FontAwesomeIcon
      className="animate-spin text-4xl text-secondAccent"
      icon={faSpinner}
    ></FontAwesomeIcon>
  );
}
