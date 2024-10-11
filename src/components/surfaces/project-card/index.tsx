"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "~/components/widgets/Skeleton";
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
      {!!filteredTasksByProject ? (
        <>
          {filteredTasksByProject?.map(({ project, dates }) => (
            <ProjectContainer
              key={project.id}
              onClick={() => HandleClickProjectCard(project.id)}
            >
              <CardContent project={project} dates={dates} />

              <ProgressBar />
            </ProjectContainer>
          ))}
        </>
      ) : (
        <>
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectContainer key={index}>
              <Skeleton
                style={{ marginTop: "1rem", marginLeft: "1rem" }}
                width="90%"
                height="1.25rem"
              />
              <Skeleton
                style={{ marginLeft: "1rem" }}
                width="90%"
                height="1.25rem"
              />
            </ProjectContainer>
          ))}
        </>
      )}
    </Container>
  );
}
