import { ReactNode } from "react";

import { styled } from "@linaria/react";
import Header from "../components/header";

import { Theme } from "@radix-ui/themes";
const Container = styled.div`
  width: 100%;
  height: 100%;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  return (
    <Theme>
      <Container>
        <Header />
        {children}
      </Container>
    </Theme>
  );
}
