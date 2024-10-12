"use client";

import { useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Skeleton } from "~/components/widgets/Skeleton";
import { useFilteredTasksByProject } from "~/hooks/useFilteredTasksByProject";
import { api } from "~/trpc/react";
import { showToast } from "~/utils/functions/showToast";
import { CardContent } from "./CardContent";
import { ProgressBar } from "./ProgressBar";
import { Container, ProjectContainer } from "./styles";

export function ProjectsCards() {
  const { session } = useSession();
  const userId = session?.user.id;
  const router = useRouter();
  const { filteredTasksByProject } = useFilteredTasksByProject();

  function HandleClickProjectCard(projectId: string) {
    router.push(`/espelho?projectId=${projectId}`);
  }

  const getClickupKeys = api.clickup.getClickupKeys.useQuery({
    userId: userId ?? "",
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (
        !getClickupKeys.data?.AuthorizationPkKey &&
        !getClickupKeys.data?.listId
      ) {
        showToast(
          "error",
          "Não encontramos PK ou ListId cadastrados",
        );
      }
      router.push("/configuracao");
    }, 4000);

    if (
      getClickupKeys.data?.AuthorizationPkKey &&
      getClickupKeys.data?.listId
    ) {
      clearTimeout(timeoutId);
    }
    return () => clearTimeout(timeoutId);
  }, [getClickupKeys, router]);

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
