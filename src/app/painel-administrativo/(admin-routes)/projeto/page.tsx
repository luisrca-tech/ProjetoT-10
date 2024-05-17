"use client";

import FormSelectInput from "@/app/components/FormSelectInput";
import {
  Container,
  FormContainer,
  MainContainer,
  SwitchContainer,
} from "./styles";
import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useContext, useState } from "react";
import ToggleSwitch from "@/app/components/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/CustomDateRangePicker";
import { ScrolldownContext } from "@/contexts/ScrolldownContext";

export default function Projeto() {
  const { checked, handleCheckedChange, isDatePickerOpen, handleBlurCalendar } =
    useContext(ScrolldownContext);

  return (
    <Container className={roboto.className}>
      <ProjectProfileHeader inputName="Nomeie seu projeto..." />

      <MainContainer>
        {isDatePickerOpen && <CustomDateRangePicker />}
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
