import React from "react";

interface HoverSlideButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: String;
  bgColor?: String;
  icon?: any;
  disabled?: boolean;
}

export default function HoverSlideButton({
  onClick,
  label,
  bgColor = "primary",
  icon,
  disabled,
}: HoverSlideButtonProps) {
  return (
    <button
      className={`btn w-32 h-12 rounded-lg relative btn-accent btn-outline outline-primary overflow-hidden`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
      {icon}
    </button>
  );
}
