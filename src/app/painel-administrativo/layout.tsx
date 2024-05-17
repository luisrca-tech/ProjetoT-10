"use client";
import { ReactNode, useState } from "react";

import { styled } from "@linaria/react";
import Header from "../components/header";
import { ProjectProfileHeader } from "../components/ProjectProfileHeader";

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
      <Header />
      <Container>{children}</Container>
    </>
  );
}
