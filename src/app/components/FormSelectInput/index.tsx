"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Header,
  InputsDataContainer,
  InputsRow,
  Footer,
} from "./styles";
import SelectInput from "../SelectInput";

interface ParentComponentState {
  rows: number[];
  selectedValues: { [key: string]: string };
}

export default function FormSelectInput() {
  const [rowsAndSelectedValues, setRowsAndSelectedValues] =
    useState<ParentComponentState>({
      rows: [0],
      selectedValues: {},
    });

  function handleInputChange(id: string, value: string) {
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [id]: value,
      },
    }));
  }

  function addRow() {
    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, prevState.rows.length],
    }));
  }

  const canAddRow = rowsAndSelectedValues.rows.every((index) => {
    const firstTextValue =
      rowsAndSelectedValues.selectedValues[`firstTextValue${index}`];
    const secondTextValue =
      rowsAndSelectedValues.selectedValues[`secondTextValue${index}`];
    const thirdTextValue =
      rowsAndSelectedValues.selectedValues[`thirdTextValue${index}`];

    return firstTextValue && secondTextValue && thirdTextValue;
  });

  useEffect(() => {
    if (canAddRow === false) return;

    addRow();
  }, [canAddRow]);

  return (
    <Container>
      <Header>
        <div>
          <span>Cargos</span>
        </div>
        <div>
          <span>Cargos</span>
        </div>
        <div>
          <span>Cargos</span>
        </div>
      </Header>

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row, index) => (
            <InputsRow key={rowsAndSelectedValues.rows.length - 1 - index}>
              <SelectInput
                placeholder="Cargo"
                id={`firstTextValue${row}`}
                onChange={(value) =>
                  handleInputChange(`firstTextValue${row}`, value)
                }
              />
              <SelectInput
                placeholder="Valor"
                id={`secondTextValue${row}`}
                onChange={(value) =>
                  handleInputChange(`secondTextValue${row}`, value)
                }
              />
              <SelectInput
                placeholder="Horas"
                id={`thirdTextValue${row}`}
                onChange={(value) =>
                  handleInputChange(`thirdTextValue${row}`, value)
                }
              />
            </InputsRow>
          ))}
      </InputsDataContainer>
      <Footer>
        <div>
          <span>Total:</span>
        </div>
        <div>
          <span>1584h</span>
        </div>
        <div>
          <span>178.200,00</span>
        </div>
      </Footer>
    </Container>
  );
}
