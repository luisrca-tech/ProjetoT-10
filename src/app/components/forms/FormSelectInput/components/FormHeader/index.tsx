import { Container, HeaderContent, EditDateContainer } from "./styles";

type FormHeaderProps = {
  checked: boolean;
};

export function FormHeader({ checked }: FormHeaderProps) {
  return (
    <Container checked={checked}>
      {!checked ? (
        <>
          <HeaderContent>
            <span className="FirstRole">Cargo</span>

            <span>Horas/mês</span>

            <span>Valor Hora</span>
          </HeaderContent>
        </>
      ) : (
        <EditDateContainer>
          <span className="FirstRole">Cargo</span>

          <span>Data de trabalho</span>
        </EditDateContainer>
      )}
    </Container>
  );
}
