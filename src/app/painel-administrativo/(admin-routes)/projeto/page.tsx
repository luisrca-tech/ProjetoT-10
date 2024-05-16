"use client";

import FormSelectInput from "@/app/components/FormSelectInput";
import { Container, SwitchContainer } from "./styles";
import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useState } from "react";
import ToggleSwitch from "@/app/components/ToggleSwitch";
import { CustomDateRangePicker } from "@/app/components/CustomDateRangePicker";

export default function Projeto() {
  const [checked, setChecked] = useState<boolean>(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
    //setChecked e checked vao vir do contexto.
  };

  return (
    <Container className={roboto.className}>
      {/* {isDatePickerOpen && 
      <CustomDateRangePicker />} 
      Essa sera a versao final.
      isDatePickerOpen vem do contexto.

      
      */}
      <CustomDateRangePicker />
      <SwitchContainer>
        <span>Editar datas</span>
        <ToggleSwitch onChange={handleChange} />
      </SwitchContainer>
      <FormSelectInput checked={checked} />
    </Container>
  );
}
