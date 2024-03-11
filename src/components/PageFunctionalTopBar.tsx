import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PageFunctionalTopBarProps = {
  children?: React.ReactNode;
  label: string;
};

export default function PageFunctionalTopBar({
  children,
  label,
}: PageFunctionalTopBarProps) {
  return (
    <div className="h-[10%] min-h-[80px] w-full flex items-center justify-between pr-8">
      <div className="h-full flex gap-2 justify-center items-center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="hover:cursor-pointer p-5 text-2xl"
          onClick={() => window.history.back()}
        />
        <p className="text-3xl">{label}</p>
      </div>
      {children}
    </div>
  );
}
