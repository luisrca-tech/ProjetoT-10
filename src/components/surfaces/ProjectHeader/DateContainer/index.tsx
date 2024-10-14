"use client";

import { poppins } from "~/app/fonts";
import { Container, DatesContainer } from "./styles";
import { type ProjectDates } from "~/server/types/Clickup.type";
import { Skeleton } from "~/components/widgets/Skeleton";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
type DateContainer = {
  projectDates: ProjectDates;
  checked?: boolean;
};
export default function DateContainer({
  projectDates,
  checked,
}: DateContainer) {
  const { getTasksInfos } = useTasksOfProject();

  const tasksInfos = getTasksInfos();

  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }
  const globalProjectStartDate = formatDate(projectDates.minStartDateObj);
  const globalProjectEndDate = formatDate(projectDates.maxEndDateObj);
  return (
    <Container checked={checked}>
      <strong className={poppins.className}>Duração:</strong>
      {tasksInfos ? (
        <DatesContainer>
          <p className={poppins.className}>{globalProjectStartDate}</p>
          <span>-</span>
          <p className={poppins.className}>{globalProjectEndDate}</p>
        </DatesContainer>
      ) : (
        <Skeleton
          style={{ marginLeft: "0.25rem" }}
          width="50%"
          height="0.875rem"
        />
      )}
    </Container>
  );
}
