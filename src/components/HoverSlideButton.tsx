import React, { ReactNode } from "react";

interface HoverSlideButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: String;
  bgColor?: String;
  icon?: any;
  disabled?: boolean;
  type?: "submit" | "reset" | "button" | undefined;
  children?: ReactNode;
  className?: string;
}

export default function HoverSlideButton({
  onClick,
  disabled,
  type,
  children,
  className,
}: HoverSlideButtonProps) {
  return (
    <button
      className={`btn z-10 px-8 h-10 rounded-none border-none text-accent-content shadow-none bg-transparent relative before:transition-transform  before:w-full before:h-full before:border-secondary before:absolute before:z-10 before:border-2 before:-translate-x-1 before:translate-y-1 before:bg-transparent hover:before:translate-x-0 hover:before:translate-y-0 after:transition-transform after:w-full after:h-full after:absolute after:bg-accent after:translate-x-1 after:left-0 hover:after:translate-x-0  hover:after:translate-y-0 after:z-[-1px] ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span className="z-10">{children}</span>
    </button>
  );
}
