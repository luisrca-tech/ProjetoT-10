"use client";

import { Container, MainContainer, FormContainer } from "./styles";
import { useAtom } from "jotai";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectProfileHeader } from "../ProjectProfileHeader";
import ToggleSwitch from "../../widgets/ToggleSwitch";
import FormSelectInput from "../../forms/FormSelectInput";
import { CloseCalendarContainer } from "./CloseCalendarContainer";

import { useClickUp } from "~/app/hooks/useClickUp";

export function ProjectDetailsContent() {
  const [isDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const { isFetchAllCustomFields } = useClickUp();

  return (
    <Container>
      {isFetchAllCustomFields && (
        <>
          <ProjectProfileHeader />

          <MainContainer>
            {isDatePickerOpen && <CustomDateRangePicker />}
            <FormContainer isDatePickerOpen={isDatePickerOpen}>
              <ToggleSwitch />
              <FormSelectInput />
            </FormContainer>
          </MainContainer>

          <CloseCalendarContainer />
        </>
      )}
    </Container>
  );
}
