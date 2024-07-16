"use client";
import { ProjectsCards } from "@/app/components/surfaces/project-card";
import { Container } from "./styles";
import Header from "@/app/components/surfaces/header";

export default function Projetos() {
  return (
    <Container>
      <Header />
      <ProjectsCards />
    </Container>
  );
}
