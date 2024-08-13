import { type ReactNode } from "react";
import { Container } from "./styles";

interface FormFooterProps {
  children?: ReactNode;
}

export function FormFooter({ children }: FormFooterProps) {
  return <Container>{children}</Container>;
}
