"use client";

import { api } from "~/trpc/react";
import { Container, MainContainer } from "./styles";

const listId = "901303987731";

export default function Pessoas() {
  const getCustomFields = api.clickup.getCustomFields.useQuery({ listId });

  console.log(getCustomFields.data);

  return (
    <Container>
      <MainContainer>
        {/* <ProjectProfileHeader
          inputName="Nomeie seu projeto..."
          setStringRow={setStringRow}
          ranges={ranges}
          inputDataMenuClick={inputDataMenuClick}
          checked={checked}
        /> */}
        <h1>
          estamos na pagina FUNCIONARIO, AQUI PODERA SER EDITADO OU CRIADO UM
          FUNCIONARIO
        </h1>
      </MainContainer>
    </Container>
  );
}
