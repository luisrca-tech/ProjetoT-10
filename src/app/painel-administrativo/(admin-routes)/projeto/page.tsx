"use client";

import FormSelectInput from "@/app/components/FormSelectInput";
import {
  CloseCalendarContainer,
  Container,
  FormContainer,
  MainContainer,
  SwitchContainer,
} from "./styles";
import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useContext, useEffect, useState } from "react";
import ToggleSwitch from "@/app/components/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/CustomDateRangePicker";
import { ScrolldownContext } from "@/contexts/ScrolldownContext";
import { Range } from "react-date-range";
import { addDays } from "date-fns";

export default function Projeto() {
  const { checked, handleCheckedChange, isDatePickerOpen, handleBlurCalendar } =
    useContext(ScrolldownContext);

  const [rowCount, setRowCount] = useState(1);
  const [stringRow, setStringRow] = useState<string>("row-0");

  const [value, setValue] = useState<{ [key: string]: Range }>({
    "row-0": {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection-row-0",
    },
  });

  useEffect(() => {
    console.log(`rowCount`, rowCount);
    console.log(`value`, value);
  }, [rowCount, value]);
  return (
    <Container className={roboto.className}>
      <ProjectProfileHeader inputName="Nomeie seu projeto..." />

      <MainContainer>
        {isDatePickerOpen && (
          <CustomDateRangePicker
            value={value}
            rowCount={rowCount}
            setValue={setValue}
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
            setValue={setValue}
            setRowCount={setRowCount}
            setStringRow={setStringRow}
            stringRow={stringRow}
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
