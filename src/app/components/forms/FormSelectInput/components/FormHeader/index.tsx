import { useAtom } from "jotai";
import { Container, HeaderContent, EditDateContainer } from "./styles";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";

export function FormHeader() {
  const [checked] = useAtom(checkedAtom);

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
