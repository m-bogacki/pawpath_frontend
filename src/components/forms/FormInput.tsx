type InputProps = {
  type: string;
  identifier: string;
  defaultValue?: any;
  placeholder?: string | undefined;
  register: any;
  error?: any;
  label?: string;
  className?: string;
  textWrap?: boolean;
};

export default function FormInput({
  type,
  identifier,
  placeholder,
  register,
  error,
  label,
  className,
  defaultValue,
  textWrap,
}: InputProps) {
  return (
    <>
      <span className={`w-80 ${className} ${label && "flex"}`}>
        {label && (
          <label
            className={`flex ${type === "textarea" ? "" : "items-center"} ${
              textWrap ? "" : "text-nowrap"
            } mr-5 min-w-[80px]`}
            htmlFor={identifier}
          >
            {label}
          </label>
        )}
        {type === "textarea" ? (
          <textarea
            {...register(identifier)}
            name={identifier}
            id={identifier}
            placeholder={placeholder}
            className={`${
              error ? "border-red-700" : "border-secondary"
            } mt-1 p-2 h-32 border-2 rounded-md w-full bg-transparent resize-none`}
            defaultValue={defaultValue}
          ></textarea>
        ) : (
          <input
            {...register(identifier)}
            type={type}
            name={identifier}
            id={identifier}
            placeholder={placeholder}
            className={`${
              error ? "border-red-700" : "border-secondary"
            } mt-1 p-2  w-full`}
            defaultValue={defaultValue}
          />
        )}
        <label htmlFor={identifier}>{error}</label>
      </span>
    </>
  );
}
