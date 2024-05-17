import { ProjectProfileHeader } from "@/app/components/ProjectProfileHeader";
import { Container, MainContainer } from "./styles";

export default function Pessoas() {
  return (
    <Container>
      <MainContainer>
        <ProjectProfileHeader value="Nome do Projeto..." />
        <h1>
          estamos na pagina FUNCIONARIO, AQUI PODERA SER EDITADO OU CRIADO UM
          FUNCIONARIO
        </h1>
      </MainContainer>
    </Container>
  );
}
