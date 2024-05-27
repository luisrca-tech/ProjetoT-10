"use client";
import { useState } from "react";
import {
  Container,
  Header,
  InputsDataContainer,
  Footer,
  EditDateContainer,
  BudgetContainer,
  HeaderContent,
} from "./styles";

import { poppins } from "@/app/fonts";
import RowAndScrollDownContainer from "../RowAndScrollDownContainer";
import { FormSelectInputProps, RowsAndSelectedValueProps } from "../types";

export default function FormSelectInput({
  checked,
  setRanges,
  setRowCount,
  rowCount,
  setStringRow,
  ranges,
  inputDataMenuClick,
}: FormSelectInputProps) {
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

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
        <BudgetContainer className={poppins.className}>
          <span>Total:</span>
        </BudgetContainer>
        <BudgetContainer>
          <span>{`${totalHours}h`}</span>
        </BudgetContainer>
        <BudgetContainer>
          <span>{`R$${totalValue},00`}</span>
        </BudgetContainer>
      </Footer>
    </Container>
  );
}
