"use client"

import { ProjectCard } from "@/app/components/surfaces/project-card";
import { Container } from "./styles";
import Header from "@/app/components/surfaces/header";

export default function Projetos() {
  return (
    <Container>
      <Header />

      <ProjectCard />
    </Container>
  );
}
