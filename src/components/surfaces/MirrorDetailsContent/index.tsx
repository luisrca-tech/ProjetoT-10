"use client";

import { useAtom } from "jotai";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { useGetBudgetAndProfileInfos } from "~/utils/functions/useGetBudgetAndProfileInfos";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectHeader } from "../ProjectHeader";
import { MirrorTableContainer } from "./MirrorTableContainer";
import {
  Container,
  InputsContent,
  MainContainer,
  TableContainer,
} from "./styles";

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
          <MirrorTableContainer
            tasksCustomFields={tasksCustomFields}
            budgetInfo={budgetInfo}
          />
        </TableContainer>
      </MainContainer>
    </Container>
  );
}
