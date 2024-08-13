import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef } from "react";
import { Message } from "./styles";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export default function ErrorMessage({ children }: Props) {
  const parent = useRef(null);
  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return <Message ref={parent}>{children}</Message>;
}
