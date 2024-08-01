"use client";

import {
  CardContentDescriptions,
  CardContentContainer,
  Container,
  ProjectContainer,
  ProgressBarContainer,
  BackgroundProgressBar,
  ProgressBar,
} from "./styles";
import GoogleImage from "/public/images/google img.svg";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { poppins } from "~/assets/fonts/fonts";
import { useClickUp } from "~/app/hooks/useClickUp";

const listId = "901303987731";

export function ProjectsCards() {
  const [progressWidth, setProgressWidth] = useState(0);
  const router = useRouter();
  const [passedMinutes, setPassedMinutes] = useState(0);

  const totalHours = 3600000;

  const { filteredTasksByProject } = useClickUp();
  console.log(filteredTasksByProject, `filteredTasks`);

  function formatDate(timestamp: number | null): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
  }

  function HandleClickProjectCard(projectId: string) {
    router.push(`/painel-administrativo/projeto?projectId=${projectId}`);
  }

  useEffect(() => {
    const calculateProgress = () => {
      setPassedMinutes((prevPassedMinutes) => prevPassedMinutes + 360000);
      const progress = (passedMinutes / totalHours) * 100;
      setProgressWidth(progress);
    };

    const intervalId = setInterval(calculateProgress, 3000);

    return () => clearInterval(intervalId);
  }, [passedMinutes, totalHours]);

  return (
    <Container>
      {filteredTasksByProject?.map(({ project, dates }) => (
        <ProjectContainer
          key={project.id}
          onClick={() => HandleClickProjectCard(project.id)}
        >
          <CardContentContainer>
            <Image
              src={GoogleImage as StaticImageData}
              alt="Imagem logo da google"
              color="#F7F2FA"
            />
            <CardContentDescriptions className={poppins.className}>
              <strong>{project.label}</strong>

              <p>
                <span>Duração</span>:{}
                <span>{dates && formatDate(dates.minStartDate)}</span>
                <span>-</span>
                <span>{dates && formatDate(dates.maxEndDate)}</span>
              </p>
            </CardContentDescriptions>
          </CardContentContainer>
          <ProgressBarContainer>
            <BackgroundProgressBar>
              <ProgressBar style={{ width: `${progressWidth}%` }} />
            </BackgroundProgressBar>
          </ProgressBarContainer>
        </ProjectContainer>
      ))}
    </Container>
  );
}
