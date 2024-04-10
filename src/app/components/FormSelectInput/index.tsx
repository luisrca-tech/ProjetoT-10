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

export default function FormSelectInput({ checked }: { checked: boolean }) {
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

  const isValueInInput = (row: number, inputName: string) => {
    const { selectedValues } = rowsAndSelectedValues;
    const textValue = selectedValues[`${inputName}${row}`];
    return textValue !== undefined;
  };

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
            <InputsRow checked={checked} key={rowsAndSelectedValues.rows.length - 1 - index}>
              <SelectInput
                placeholder="Cargo"
                id={`firstTextValue${row}`}
                onChange={(value) =>
                  handleInputChange(`firstTextValue${row}`, value)
                }
                hasValue={isValueInInput(row, "firstTextValue")}
                checked={checked}
              />
              {!checked ? (
                <>
                  <SelectInput
                    placeholder="Valor"
                    id={`secondTextValue${row}`}
                    onChange={(value) =>
                      handleInputChange(`secondTextValue${row}`, value)
                    }
                    hasValue={isValueInInput(row, "secondTextValue")}
                    checked={checked}
                  />
                  <SelectInput
                    placeholder="Horas"
                    id={`thirdTextValue${row}`}
                    onChange={(value) =>
                      handleInputChange(`thirdTextValue${row}`, value)
                    }
                    hasValue={isValueInInput(row, "thirdTextValue")}
                    checked={checked}
                  />
                </>
              ) : (
                <>
                  <input type="date" />
                </>
              )}
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
