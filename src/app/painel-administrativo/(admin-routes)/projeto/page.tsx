"use client";

import { roboto } from "~/app/fonts";

import { Container } from "./styles";

import Header from "~/components/surfaces/header";
import { ProjectDetailsContent } from "../../autenticacao/forgot-password/_components/ProjectDetailsContent";

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
