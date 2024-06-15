"use client";
import { Container, InputsDataContainer, Footer } from "./styles";

import { FormHeader } from "./components/FormHeader";
import RowAndScrollDownContainer from "./components/RowAndScrollDownContainer";
import { BudgetContainer } from "./components/FooterSumContainer";
import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";

interface FormSelectInputProps {
  inputDataMenuClick: (row: string) => void;
}

export default function FormSelectInput({
  inputDataMenuClick,
}: FormSelectInputProps) {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);

  return (
    <Container>
      <FormHeader />

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row) => (
            <RowAndScrollDownContainer
              row={row}
              key={row}
              inputDataMenuClick={inputDataMenuClick}
            />
          ))}
      </InputsDataContainer>
      <Footer>
        <BudgetContainer />
      </Footer>
    </Container>
  );
}
