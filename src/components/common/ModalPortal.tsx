import React from "react";
import ReactDOM from "react-dom";

interface ModalPortalProps {
  children: React.ReactNode; // children prop의 타입 정의
}

export const ModalPortal: React.FC<ModalPortalProps> = ({ children }) => {
  const el = document.getElementById("modal");

  if (!el) return null; // modal 요소가 없으면 null 반환

  return ReactDOM.createPortal(children, el);
};
