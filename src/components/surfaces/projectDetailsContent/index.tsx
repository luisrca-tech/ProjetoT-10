"use client";

import { useAtom } from "jotai";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectHeader } from "../ProjectHeader";
import { CloseCalendarContainer } from "./CloseCalendarContainer";
import { Container, MainContainer, InputsContent } from "./styles";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { FormContainer } from "./FormContainer";
import { useGetMinAndMaxDates } from "~/utils/functions/useGetMinAndMaxDates";

export function ProjectDetailsContent() {
  const [isDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const [checked] = useAtom(checkedAtom);
  const [ranges] = useAtom(rangesAtom);
  const minAndMaxDates = useGetMinAndMaxDates(ranges);
  const minStartDateObj = minAndMaxDates.minStartDateObj;
  const maxEndDateObj = minAndMaxDates.maxEndDateObj;
  const profileHeaderInfo = { maxEndDateObj, minStartDateObj };

  return (
    <Container>
      <ProjectHeader.Root inProjectPage projectDates={profileHeaderInfo}>
        <ProjectHeader.BoxImage />
        <InputsContent>
          <ProjectHeader.EditProject checked={checked} />
          <ProjectHeader.DateContainer
            projectDates={profileHeaderInfo}
            checked={checked}
          />
        </InputsContent>
      </ProjectHeader.Root>
      <MainContainer>
        {isDatePickerOpen && <CustomDateRangePicker />}
        <FormContainer />
      </MainContainer>
      <CloseCalendarContainer />
    </Container>
  );
}
