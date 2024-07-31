"use client";
import { type ReactNode } from "react";
import { styled } from "@linaria/react";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

type AuthHeaderProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: AuthHeaderProps) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}
