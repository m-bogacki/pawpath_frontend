import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import HoverSlideButton from "../HoverSlideButton";

type CenteredFormProps = {
  handleSubmit: () => void;
  children?: React.ReactNode;
  loading: boolean;
};

export default function CenteredForm({
  handleSubmit,
  loading,
  children,
}: CenteredFormProps) {
  return (
    <div className="flex justify-center items-center rounded-lg">
      <form action="POST">
        {children}
        <div className="w-full md:col-span-2 flex justify-center items-center">
          <HoverSlideButton
            onClick={handleSubmit}
            className="mt-12 w-36"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </HoverSlideButton>
        </div>
      </form>
    </div>
  );
}
