import { Suspense } from "react";
import { Container } from "./styles";
import HeaderRowAndScrollDownContainer from "./HeaderRowAndScrollDownContainer";

type EditProjectContainer = {
  checked?: boolean;
};
export function EditProjectContainer({ checked }: EditProjectContainer) {
  return (
    <Container checked={checked}>
      <Suspense>
        <HeaderRowAndScrollDownContainer />
      </Suspense>
    </Container>
  );
}
