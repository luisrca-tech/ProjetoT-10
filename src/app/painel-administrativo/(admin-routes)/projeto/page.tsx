"use client";

import { Container } from "./styles";

import { roboto } from "~/app/fonts";

import Header from "~/app/components/surfaces/header";

import { ProjectDetailsContent } from "~/app/components/surfaces/projectDetailsContent";
import { Suspense } from "react";

export default function Projeto() {
  return (
    <Suspense>
      <Container className={roboto.className}>
        <Header />
        <Suspense>
          <ProjectDetailsContent />
        </Suspense>
      </Container>
    </Suspense>
  );
}
