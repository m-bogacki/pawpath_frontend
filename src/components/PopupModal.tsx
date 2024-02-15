import { ReactNode } from "react";
import OutsideAlerter from "../custom_hooks/OutsideAlerter";

type PopupModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export default function PopupModal({ onClose, children }: PopupModalProps) {
  return (
    <div
      className={`absolute flex top-0 left-0 justify-center items-center w-screen h-screen bg-slate-800 backdrop-blur-md bg-opacity-30 z-50`}
    >
      <OutsideAlerter onClickOutside={onClose}>{children}</OutsideAlerter>
    </div>
  );
}
