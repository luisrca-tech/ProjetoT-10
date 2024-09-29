"use client";

import { useAtom } from "jotai";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectHeader } from "../ProjectHeader";
import {
  Container,
  MainContainer,
  TableContainer,
  InputsContent,
  LoadingCustomFields,
} from "./styles";
import { MirrorTableContainer } from "./MirrorTableContainer";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { useGetBudgetAndProfileInfos } from "~/utils/functions/useGetBudgetAndProfileInfos";

export function MirrorDetailsContent() {
  const [isDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const { getTasksInfos } = useTasksOfProject();
  const tasksCustomFields = getTasksInfos();
  const { totalDays, totalHours, totalValue, maxEndDateObj, minStartDateObj } =
    useGetBudgetAndProfileInfos(tasksCustomFields);

  const budgetInfo = { totalDays, totalHours, totalValue };
  const profileHeaderInfo = { maxEndDateObj, minStartDateObj };
  return (
    <Container>
      <ProjectHeader.Root>
        <ProjectHeader.BoxImage />
        <InputsContent>
          <ProjectHeader.EditProject />
          <ProjectHeader.DateContainer projectDates={profileHeaderInfo} />
        </InputsContent>
      </ProjectHeader.Root>
      <MainContainer>
        {isDatePickerOpen && <CustomDateRangePicker />}
        <TableContainer isDatePickerOpen={isDatePickerOpen}>
          {!!tasksCustomFields ? (
            <MirrorTableContainer
              tasksCustomFields={tasksCustomFields}
              budgetInfo={budgetInfo}
            />
          ) : (
            <LoadingCustomFields>Carregando...</LoadingCustomFields>
          )}
        </TableContainer>
      </MainContainer>
    </Container>
  );
}
