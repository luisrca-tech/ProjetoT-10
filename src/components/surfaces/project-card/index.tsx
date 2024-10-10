"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFilteredTasksByProject } from "~/hooks/useFilteredTasksByProject";
import { showToast } from "~/utils/functions/showToast";
import { CardContent } from "./CardContent";
import { ProgressBar } from "./ProgressBar";
import { Container, ProjectContainer } from "./styles";

export function ProjectsCards() {
  const router = useRouter();
  const { filteredTasksByProject, isNocustomFieldProject } =
    useFilteredTasksByProject();

  function HandleClickProjectCard(projectId: string) {
    router.push(`/espelho?projectId=${projectId}`);
  }

  useEffect(() => {
    if (!!isNocustomFieldProject) {
      showToast(
        "error",
        "Não existe Projeto_PixelCraft na lista",
        "Confira sua configuração"
      );
    }
  }, [isNocustomFieldProject]);

  return (
    <Container>
      {filteredTasksByProject?.map(({ project, dates }) => (
        <ProjectContainer
          key={project.id}
          onClick={() => HandleClickProjectCard(project.id)}
        >
          <CardContent project={project} dates={dates} />

          <ProgressBar />
        </ProjectContainer>
      ))}
    </Container>
  );
}
