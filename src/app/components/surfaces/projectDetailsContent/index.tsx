"use client";

import {
  Container,
  MainContainer,
  FormContainer,
  SwitchContainer,
  CloseCalendarContainer,
} from "./styles";

import { useAtom } from "jotai";

import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { stringRowAtom } from "~/@atom/ProjectStates/stringRowAtom";

import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectProfileHeader } from "../ProjectProfileHeader";
import ToggleSwitch from "../../widgets/ToggleSwitch";
import FormSelectInput from "../../forms/FormSelectInput";

import { useClickUp } from "~/app/hooks/useClickUp";

export function ProjectDetailsContent() {
  const [checked, setChecked] = useAtom(checkedAtom);
  const [isDatePickerOpen, setIsDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const [, setStringRow] = useAtom(stringRowAtom);

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function inputDataMenuClick(row: string) {
    openDatePicker();
    setStringRow(row);
  }

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  const handleBlurCalendar = () => {
    setIsDatePickerOpen(false);
  };

  const { tasksOfProject, isFetchAllCustomFields } = useClickUp();
  console.log(tasksOfProject, `tasksOfProject`);
  console.log(isFetchAllCustomFields, `isFetchAllCustomFields`);

  return (
    <>
      {isFetchAllCustomFields && (
        <>
          <ProjectProfileHeader inputDataMenuClick={inputDataMenuClick} />

          <MainContainer>
            {isDatePickerOpen && <CustomDateRangePicker />}
            <FormContainer isDatePickerOpen={isDatePickerOpen}>
              <SwitchContainer>
                <span>Editar datas</span>
                <ToggleSwitch onChange={handleCheckedChange} />
              </SwitchContainer>
              <FormSelectInput inputDataMenuClick={inputDataMenuClick} />
            </FormContainer>
          </MainContainer>

          <CloseCalendarContainer
            isDatePickerOpen={isDatePickerOpen}
            onClick={handleBlurCalendar}
          ></CloseCalendarContainer>
        </>
      )}
    </>
  );
}
