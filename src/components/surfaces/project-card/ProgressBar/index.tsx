"use client";
import { useEffect, useState } from "react";
import { Container, BackgroundProgressBar, ProgressBarContent } from "./styles";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { useGetBudgetAndProfileInfos } from "~/utils/functions/useGetBudgetAndProfileInfos";

type ProgressBarProps = {
  project: {
    id?: string;
    name?: string;
    color?: string | null;
    orderindex?: number;
    label?: string;
  };
};
export function ProgressBar({ project }: ProgressBarProps) {
  const [progressWidth, setProgressWidth] = useState(0);
  const projectId = project.id;
  const { getTasksInfos } = useTasksOfProject(projectId);
  const tasksCustomFields = getTasksInfos();

  const { maxEndDateObj, minStartDateObj } =
    useGetBudgetAndProfileInfos(tasksCustomFields);

  useEffect(() => {
    if (!minStartDateObj || !maxEndDateObj) {
      return;
    }

    const totalDuration = maxEndDateObj.getTime() - minStartDateObj.getTime();

    const calculateProgress = () => {
      const now = Date.now();
      const elapsedTime = now - minStartDateObj.getTime();

      const clampedElapsedTime = Math.max(elapsedTime, 0);
      const progress = Math.min(
        (clampedElapsedTime / totalDuration) * 100,
        100
      );
      setProgressWidth(progress);
    };

    calculateProgress();
  }, [minStartDateObj, maxEndDateObj]);

  return (
    <Container>
      {tasksCustomFields && (
        <BackgroundProgressBar>
          <ProgressBarContent style={{ width: `${progressWidth}%` }} />
        </BackgroundProgressBar>
      )}
    </Container>
  );
}
