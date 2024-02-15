import { PropsWithChildren } from "react";

type InputProps = {
  type: string;
  identifier: string;
  placeholder?: string | undefined;
  register: any;
  error?: any;
  label?: string;
  className?: string;
  children?: PropsWithChildren;
};

export default function FormInput({
  type,
  identifier,
  placeholder,
  register,
  error,
  label,
  className,
  children,
}: InputProps) {
  return (
    <>
      <span className={`w-80 ${className} ${label && "flex"}`}>
        {label && (
          <label
            className="flex items-center text-nowrap mr-5 min-w-[80px]"
            htmlFor={identifier}
          >
            {label}
          </label>
        )}
        <input
          {...register(identifier)}
          type={type}
          name={identifier}
          id={identifier}
          placeholder={placeholder}
          className={`${
            error ? "border-red-700" : "border-secondary"
          } mt-1 p-2  w-full`}
        />
        <label htmlFor={identifier}>{error}</label>
      </span>
    </>
  );
}
