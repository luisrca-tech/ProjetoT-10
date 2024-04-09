"use client";

import FormSelectInput from "@/app/components/FormSelectInput";
import {
  Container,
  InputsData,
  InputsDataContainer,
  SwitchContainer,
} from "./styles";
import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { roboto } from "@/app/fonts";
import { useState } from "react";
import ToggleSwitch from "@/app/components/ToggleSwitch";

export default function Projeto() {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  return (
    <Container className={roboto.className}>
      <ProjectProfileHeader value="Nome do Projeto..." />
      <SwitchContainer>
        <span>Editar datas</span>
        <ToggleSwitch onChange={handleChange} />
      </SwitchContainer>
      <FormSelectInput />
    </Container>
  );
}
