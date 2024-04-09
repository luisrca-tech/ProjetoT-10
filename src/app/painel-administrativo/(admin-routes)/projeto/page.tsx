"use client";

import { Container, SwitchContainer } from "./styles";
import { useEffect, useState } from "react";
import ToogleSwitch from "@/app/components/ToogleSwitch";
import { poppins } from "@/app/fonts";
import SelectInput from "@/app/components/SelectInput";
import FormSelectInput from "@/app/components/FormSelectInput";

interface ParentComponentState {
  rows: number[];
  selectedValues: { [key: string]: string };
}

export default function Projeto() {
  const [checked, setChecked] = useState<boolean>(false);

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

  function handleCheckedChange() {
    setChecked(!checked);
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
    <Container className={poppins.className}>
      <SwitchContainer>
        <span>Editar datas</span>
        <ToogleSwitch onChange={handleCheckedChange} />
      </SwitchContainer>

      <FormSelectInput />
    </Container>
  );
}
