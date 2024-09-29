import { Suspense } from "react";
import { Container } from "./styles";
import HeaderRowAndScrollDownContainer from "../HeaderRowAndScrollDownContainer";
export function EditProjectContainer() {
  return (
    <Container>
      <Suspense>
        <HeaderRowAndScrollDownContainer />
      </Suspense>
    </Container>
  );
}
