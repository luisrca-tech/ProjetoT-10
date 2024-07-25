"use client";

import { Container } from "./styles";

import { roboto } from "~/app/fonts";

import Header from "~/app/components/surfaces/header";

import { ProjectDetailsContent } from "~/app/components/surfaces/projectDetailsContent";
import { Suspense } from "react";

export default function Projeto() {
  return (
    <Container className={roboto.className}>
      <Header />
      <Suspense>
        <ProjectDetailsContent />
      </Suspense>
    </Container>
  );
}
