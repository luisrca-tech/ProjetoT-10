import { useAtom } from "jotai";
import { Container, EditProjectContainer, DataContainer } from "./styles";
import HeaderRowAndScrollDownContainer from "../HeaderRowAndScrollDownContainer";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import CalendarDateValues from "../CalendarDateValues";

export default function InputContent() {
  const [checked] = useAtom(checkedAtom);

  return (
    <Container>
      {!checked ? (
        <EditProjectContainer>
          <HeaderRowAndScrollDownContainer />
        </EditProjectContainer>
      ) : (
        <DataContainer>
          <strong>Duração:</strong>
          <CalendarDateValues />
        </DataContainer>
      )}
    </Container>
  );
}
