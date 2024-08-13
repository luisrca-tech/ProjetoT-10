"use client";

import { Container, ProjectContainer } from "./styles";
import { CardContent } from "./CardContent";
import { useRouter } from "next/navigation";
import { ProgressBar } from "./ProgressBar";
import { useFilteredTasksByProject } from "~/app/hooks/useFilteredTasksByProject";
import { useEffect } from "react";
import { showToast } from "~/utils/functions/showToast";

export function ProjectsCards() {
  const router = useRouter();
  const { filteredTasksByProject, isNocustomFieldProject } =
    useFilteredTasksByProject();

  function HandleClickProjectCard(projectId: string) {
    router.push(`/painel-administrativo/projeto?projectId=${projectId}`);
  }

  useEffect(() => {
    if (!!isNocustomFieldProject) {
      showToast(
        "error",
        "Não existe Projeto_PixelCraft na lista",
        "Compare seu painel administrativo com a lista ClickUp!"
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
