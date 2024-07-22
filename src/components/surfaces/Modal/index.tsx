"use client";

import { Container } from "./styles";
import { type ReactNode, useEffect } from "react";

type ModalProps = {
  onClickCallback?: () => void;
  children?: ReactNode;
};

export default function Modal({ children, onClickCallback }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return <Container onClick={onClickCallback}>{children}</Container>;
}
