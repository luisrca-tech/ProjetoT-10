"use client";
import { Container, InputContainer } from "./styles";
import { useAtom } from "jotai";
import SelectInput from "~/app/components/inputs/SelectInput";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import ScrollDownContainer from "../../../../forms/FormSelectInput/components/ScrollDownContainer";
import { useIsValueInInput } from "~/app/utils/functions/isValueInInput";
import { useGetInputValueAtIndex } from "~/app/utils/functions/getInputValueAtIndex";
import { useToggleSelectOpen } from "~/app/utils/functions/toggleSelectedOpen";
import { useIsSelectOpen } from "~/app/utils/functions/isSelectOpen";

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
          readOnly={true}
        />
      </InputContainer>
      {useIsSelectOpen(row) && <ScrollDownContainer row={row} />}
    </Container>
  );
}
