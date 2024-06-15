"use client";
import { useState } from "react";
import { Container, InputContainer, SeparatorContainer } from "./styles";
import Image from "next/image";
import { poppins } from "@/app/fonts";
import AddButton from "../../../../../../../public/add.svg";
import { useAtom } from "jotai";
import { projectOptionsAtom } from "@/@atom/api/CustomFields/projectFieldAtom";
import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import SelectInput from "@/app/components/inputs/SelectInput";
import { projectSelectedValuePropAtom } from "@/@atom/ProjectStates/projectSelectedValue";
import ScrollDownContainer from "../../../../forms/FormSelectInput/components/ScrollDownContainer";

export default function HeaderRowAndScrollDownContainer() {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [projectSelectedValue, setProjectSelectedValue] = useAtom(
    projectSelectedValuePropAtom,
  );
  const [selectedItemIndex, setSelectedItemIndex] = useState<string | null>(
    null,
  );
  const row = "projectRow";

  function toggleSelectOpen(index: string) {
    setSelectedItemIndex(selectedItemIndex === index ? null : index);
  }

  function isValueInInput(row: string) {
    const { selectedValues } = rowsAndSelectedValues;
    const textValue = selectedValues[row];

    return textValue !== undefined && textValue.length > 0;
  }

  function isSelectOpen(index: string) {
    return selectedItemIndex === index;
  }

  function handleInputChange(row: string, value: string, optionId?: string) {
    setProjectSelectedValue((prevState) => ({
      ...prevState,
      selectedValues: {
        ...prevState.selectedValues,
        [`${row}-text`]: value,
        [`${row}-option`]: `${optionId}`,
      },
    }));
  }

  return (
    <Container key={row}>
      <InputContainer>
        <SelectInput
          isInProjectHeader
          type="text"
          placeholder="Projeto"
          id={row}
          onChange={(value) => handleInputChange(row, value)}
          hasValue={isValueInInput(row)}
          inputValue={projectSelectedValue.selectedValues[`${row}-text`]}
          setIsSelectOpen={() => toggleSelectOpen(row)}
        />
      </InputContainer>
      {isSelectOpen(row) && <ScrollDownContainer row={row} />}
    </Container>
  );
}
