"use client";

import FormSelectInput from "@/app/components/FormSelectInput";
import {
  Container,
  SwitchContainer,
  MainContainer,
  FormContainer,
} from "./styles";
import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useState } from "react";
import ToggleSwitch from "@/app/components/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/CustomDateRangePicker";

export default function Projeto() {
  const [checked, setChecked] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleCheckedChange = () => {
    setChecked(!checked);
  };

  function ToggleDatePicker() {
    setIsDatePickerOpen(!isDatePickerOpen);
  }

  return (
    <Container className={roboto.className}>
      <ProjectProfileHeader
        checked={checked}
        value="Nome do Projeto..."
        toggleDatePicker={ToggleDatePicker}
      />

      <MainContainer>
        {isDatePickerOpen && (
          <div onBlur={() => setIsDatePickerOpen(false)}>
            <CustomDateRangePicker />
          </div>
        )}
        <FormContainer isDatePickerOpen={isDatePickerOpen}>
          <SwitchContainer>
            <span>Editar datas</span>
            <ToggleSwitch onChange={handleCheckedChange} />
          </SwitchContainer>
          <FormSelectInput checked={checked} />
        </FormContainer>
      </MainContainer>
    </Container>
  );
}
