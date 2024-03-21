import { ReactNode } from "react";

import { styled } from "@linaria/react";
import Header from "../components/header";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
