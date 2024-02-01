import { PropsWithChildren } from "react";

type InputProps = {
  type: string;
  identifier: string;
  text: string;
  register: any;
  error?: any;
  children?: PropsWithChildren;
};

export default function FormInput({
  type,
  identifier,
  text,
  register,
  error,
  children,
}: InputProps) {
  return (
    <>
      <p className="mt-2 w-80">
        <input
          {...register(identifier)}
          type={type}
          name={identifier}
          id={identifier}
          placeholder={text}
          className={`${
            error ? "border-red-700" : "border-secondary"
          } mt-1 p-2  w-full`}
        />
        <label htmlFor={identifier}>{error}</label>
      </p>
    </>
  );
}
