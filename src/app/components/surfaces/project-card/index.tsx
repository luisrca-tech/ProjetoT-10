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
import GoogleImage from "../../../../../public/google img.svg";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projectOptionsAtom } from "@/@atom/api/CustomFields/projectOptionsAtom";
import { useAtom } from "jotai";
import { getTasks } from "@/app/services/api/tasks/getTasks";
import { toast } from "react-toastify";
import { loadingAtom } from "@/@atom/LoadingState/loadingAtom";
import { usePathname, useRouter } from "next/navigation";
import useClickUpFetch from "@/app/hooks/useClickUpFetch";
import { EndPointClickUpApiEnum } from "@/clickUpApi/EndPointClickUpApiEnum";
import { Task } from "@/app/types/clickUpApi";
import { poppins } from "@/app/fonts";

export function ProjectsCards() {
  const [progressWidth, setProgressWidth] = useState(0);
  const router = useRouter();
  const [passedMinutes, setPassedMinutes] = useState(0);

  const totalHours = 3600000;

  const { projectOptions } = useClickUpFetch(EndPointClickUpApiEnum.FIELD);

  const { data: getTaskResp } = useClickUpFetch<Task[]>(
    EndPointClickUpApiEnum.TASK,
  );

  const projectsWithTasks = projectOptions?.filter((project) =>
    getTaskResp?.some((task) =>
      task.custom_fields.some(
        (field) =>
          Array.isArray(field.value) && field.value.includes(project.id),
      ),
    ),
  );

  const filteredTasksByProject = projectsWithTasks?.map((project) => {
    const tasksForProject = getTaskResp?.filter((task) =>
      task.custom_fields.some((field) => {
        if (Array.isArray(field.value)) {
          return field.value.includes(project.id);
        }
        return false;
      }),
    );

    const dates = tasksForProject?.reduce(
      (acc, task) => {
        const startDate = task.start_date ? parseInt(task.start_date) : null;
        const endDate = task.due_date ? parseInt(task.due_date) : null;

        if (startDate && (!acc.minStartDate || startDate < acc.minStartDate)) {
          acc.minStartDate = startDate;
        }
        if (endDate && (!acc.maxEndDate || endDate > acc.maxEndDate)) {
          acc.maxEndDate = endDate;
        }

        return acc;
      },
      {
        minStartDate: null as number | null,
        maxEndDate: null as number | null,
      },
    );

    return { project, tasks: tasksForProject, dates };
  });

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
            <Image src={GoogleImage} alt="" color="#F7F2FA" />
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
