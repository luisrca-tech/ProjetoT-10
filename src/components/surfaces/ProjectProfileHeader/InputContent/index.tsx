import { useAtom } from "jotai";
import { Container, EditProjectContainer, DataContainer } from "./styles";
import HeaderRowAndScrollDownContainer from "../HeaderRowAndScrollDownContainer";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import CalendarDateValues from "../CalendarDateValues";
import { poppins } from "~/app/fonts";
import { Suspense } from "react";

export default function InputContent() {
  const [checked] = useAtom(checkedAtom);

  return (
    <Container>
      {!checked ? (
        <EditProjectContainer>
          <Suspense>
            <HeaderRowAndScrollDownContainer />
          </Suspense>
        </EditProjectContainer>
      ) : (
        <DataContainer>
          <strong className={poppins.className}>Duração:</strong>
          <CalendarDateValues />
        </DataContainer>
      )}
    </Container>
  );
}
