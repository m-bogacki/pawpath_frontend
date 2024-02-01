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
  label,
  bgColor = "secondary",
  icon,
  disabled,
  type,
  children,
  className,
}: HoverSlideButtonProps) {
  return (
    <button
      className={`btn px-10 border-none text-neutral bg-${bgColor} hover:bg-accent ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}
