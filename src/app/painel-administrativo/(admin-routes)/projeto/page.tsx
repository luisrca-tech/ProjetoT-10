"use client";

import { roboto } from "~/app/fonts";

import { Container } from "./styles";

import { Suspense } from "react";
import { ProjectDetailsContent } from "~/components/surfaces/projectDetailsContent";
import Header from "~/components/surfaces/header";

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
