"use client";

import { Container, MainContainer } from "./styles";
import { FormFooter } from "~/components/forms/FormSelectInput/FormFooter";
export default function Pessoas() {
  return (
    <Container>
      <MainContainer>
        <h1>
          estamos na pagina FUNCIONARIO, AQUI PODERA SER EDITADO OU CRIADO UM
          FUNCIONARIO
        </h1>
      </MainContainer>
      <FormFooter />
    </Container>
  );
}
