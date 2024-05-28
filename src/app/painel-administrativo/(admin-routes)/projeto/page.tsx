"use client";

import FormSelectInput from "@/app/components/forms/FormSelectInput";
import {
  CloseCalendarContainer,
  Container,
  FormContainer,
  MainContainer,
  SwitchContainer,
} from "./styles";
import { ProjectProfileHeader } from "../../../components/surfaces/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useState } from "react";
import ToggleSwitch from "@/app/components/widgets/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/widgets/CustomDateRangePicker";
import { SelectableRangeProps } from "@/app/types/componentsTypes/type";

export default function Projeto() {
  const [rowCount, setRowCount] = useState(1);
  const [stringRow, setStringRow] = useState<string>("row-0");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [ranges, setRanges] = useState<{ [key: string]: SelectableRangeProps }>(
    {
      "global-project-data": {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection-global-project-data",
        isSelected: false,
      },
      "row-0": {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection-row-0",
        isSelected: false,
      },
    },
  );
  const [checked, setChecked] = useState<boolean>(false);

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  function inputDataMenuClick(row: string) {
    openDatePicker();
    setStringRow(row);
  }

  const handleBlurCalendar = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <Container className={roboto.className}>
      <ProjectProfileHeader
        inputName="Nomeie seu projeto..."
        setStringRow={setStringRow}
        ranges={ranges}
        inputDataMenuClick={inputDataMenuClick}
        checked={checked}
      />

      <MainContainer>
        {isDatePickerOpen && (
          <CustomDateRangePicker
            ranges={ranges}
            setRanges={setRanges}
            rowCount={rowCount}
            stringRow={stringRow}
          />
        )}
        <FormContainer isDatePickerOpen={isDatePickerOpen}>
          <SwitchContainer>
            <span>Editar datas</span>
            <ToggleSwitch onChange={handleCheckedChange} />
          </SwitchContainer>
          <FormSelectInput
            checked={checked}
            rowCount={rowCount}
            setRanges={setRanges}
            setRowCount={setRowCount}
            setStringRow={setStringRow}
            ranges={ranges}
            inputDataMenuClick={inputDataMenuClick}
          />
        </FormContainer>
      </MainContainer>

      <CloseCalendarContainer
        isDatePickerOpen={isDatePickerOpen}
        onClick={handleBlurCalendar}
      ></CloseCalendarContainer>
    </Container>
  );
}
