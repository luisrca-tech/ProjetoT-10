"use client";
import Header from "~/components/surfaces/header";
import { Container } from "./styles";
import { ProjectsCards } from "~/components/surfaces/project-card";

export default function Projetos() {
  return (
    <Container>
      <Header />
      <ProjectsCards />
    </Container>
  );
}
