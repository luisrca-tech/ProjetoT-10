"use client";

import Header from "~/components/surfaces/header";
import { ProjectsCards } from "~/components/surfaces/project-card";

import { Container } from "./styles";

export default function Projetos() {
  return (
    <Container>
      <Header />
      <ProjectsCards />
    </Container>
  );
}
