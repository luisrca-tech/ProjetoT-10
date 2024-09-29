"use client";

import { FormForPeople } from "~/components/forms/FormForPeople";
import { AvailableFields } from "~/components/surfaces/AvailableFieldsTable";
import { ProjectHeader } from "~/components/surfaces/ProjectHeader";
import {
  BodyContainer,
  Container,
  HeadersContainer,
  InputsContent,
} from "./styles";
import { useGetBudgetAndProfileInfos } from "~/utils/functions/useGetBudgetAndProfileInfos";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
export default function Pessoas() {
  const { getTasksInfos } = useTasksOfProject();

  const tasksInfos = getTasksInfos();
  const { maxEndDateObj, minStartDateObj } =
    useGetBudgetAndProfileInfos(tasksInfos);

  const profileHeaderInfo = { maxEndDateObj, minStartDateObj };
  return (
    <Container>
      <HeadersContainer>
        <ProjectHeader.Root>
          <ProjectHeader.BoxImage />
          <InputsContent>
            <ProjectHeader.EditProject />
            <ProjectHeader.DateContainer projectDates={profileHeaderInfo} />
          </InputsContent>
        </ProjectHeader.Root>
      </HeadersContainer>
      <BodyContainer>
        <AvailableFields />
        <FormForPeople />
      </BodyContainer>
    </Container>
  );
}
