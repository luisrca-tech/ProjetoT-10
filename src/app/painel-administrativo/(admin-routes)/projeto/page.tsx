"use client";

import FormSelectInput from "@/app/components/FormSelectInput";
import {
  Container,
  InputsData,
  InputsDataContainer,
} from "./styles";
import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { roboto } from "@/app/fonts";

export default function Projeto() {
  return (
    <Container className={roboto.className}>
      <ProjectProfileHeader value="Nome do Projeto..." />
      <FormSelectInput />
    </Container>
  );
}
