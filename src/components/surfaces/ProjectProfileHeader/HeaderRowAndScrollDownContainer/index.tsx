"use client";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { Container, InputContainer } from "./styles";
import { useAtom } from "jotai";
import SelectInput from "~/components/inputs/SelectInput";
import ScrollDownContainer from "~/components/forms/FormSelectInput/components/ScrollDownContainer";
import { useIsSelectOpen } from "~/utils/functions/isSelectOpen";
import { useToggleSelectOpen } from "~/utils/functions/toggleSelectedOpen";
import { useGetInputValueAtIndex } from "~/utils/functions/getInputValueAtIndex";
import { useIsValueInInput } from "~/utils/functions/isValueInInput";

export default function HeaderRowAndScrollDownContainer() {
  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const row = "projectRow";
  const inProfileHeader = true;
  const isValueInProjectInput = useIsValueInInput(row, "");
  const projectInputValueAtIndex = useGetInputValueAtIndex(
    undefined,
    row,
    inProfileHeader
  );
  const toggleSelectOpen = useToggleSelectOpen(row);

  function handleInputChange(row: string, value: string, optionId?: string) {
    setProjectSelectedValue((prevState) => ({
      ...prevState,
      selectedValue: {
        ...prevState.selectedValue,
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
          placeholder="Selecione um projeto"
          id={row}
          onChange={(value) => handleInputChange(row, value)}
          hasValue={isValueInProjectInput}
          inputValue={projectInputValueAtIndex}
          setIsSelectOpen={toggleSelectOpen}
        />
      </InputContainer>
      {useIsSelectOpen(row) && <ScrollDownContainer row={row} />}
    </Container>
  );
}
