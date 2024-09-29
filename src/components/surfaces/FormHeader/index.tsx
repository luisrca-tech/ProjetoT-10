import { useAtom } from "jotai";
import {
  Container,
  HeaderContent,
  EditDateContainer,
  ColumnTitleContainer,
} from "./styles";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";

export function FormHeader() {
  const [checked] = useAtom(checkedAtom);

  return (
    <Container checked={checked}>
      {!checked ? (
        <>
          <HeaderContent>
            <ColumnTitleContainer>
              <span>Cargo</span>
            </ColumnTitleContainer>

            <ColumnTitleContainer>
              <span>Horas/mês</span>
            </ColumnTitleContainer>
            <ColumnTitleContainer>
              <span>Valor Hora</span>
            </ColumnTitleContainer>
          </HeaderContent>
        </>
      ) : (
        <EditDateContainer>
          <span>Cargo</span>

          <span>Data de trabalho</span>
        </EditDateContainer>
      )}
    </Container>
  );
}
