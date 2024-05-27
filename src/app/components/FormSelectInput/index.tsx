"use client";
import { useState } from "react";
import {
  Container,
  Header,
  InputsDataContainer,
  Footer,
  EditDateContainer,
  HeaderContent,
} from "./styles";

import { poppins } from "@/app/fonts";
import RowAndScrollDownContainer from "./components/RowAndScrollDownContainer";
import { FormSelectInputProps, RowsAndSelectedValueProps } from "./types";
import { BudgetContainer } from "./components/FooterSumContainer";

export default function FormSelectInput({
  checked,
  setRanges,
  setRowCount,
  rowCount,
  setStringRow,
  ranges,
  inputDataMenuClick,
}: FormSelectInputProps) {
  const [rowsAndSelectedValues, setRowsAndSelectedValues] =
    useState<RowsAndSelectedValueProps>({
      rows: ["row-0"],
      selectedValues: {},
    });

  return (
    <Container>
      <Header checked={checked}>
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
      </Header>

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row) => (
            <RowAndScrollDownContainer
              row={row}
              setStringRow={setStringRow}
              key={row}
              rowCount={rowCount}
              ranges={ranges}
              checked={checked}
              setRanges={setRanges}
              setRowCount={setRowCount}
              rowsAndSelectedValues={rowsAndSelectedValues}
              setRowsAndSelectedValues={setRowsAndSelectedValues}
              inputDataMenuClick={inputDataMenuClick}
            />
          ))}
      </InputsDataContainer>
      <Footer>
        <BudgetContainer rowsAndSelectedValues={rowsAndSelectedValues} />
      </Footer>
    </Container>
  );
}
