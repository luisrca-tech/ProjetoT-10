"use client";
import { Container } from "./styles";
import { useAtom } from "jotai";
import SelectInput from "~/components/inputs/SelectInput";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import ScrollDownContainer from "../../../forms/FormSelectInput/ScrollDownContainer";
import { useIsValueInInput } from "~/app/utils/functions/isValueInInput";
import { useGetInputValueAtIndex } from "~/app/utils/functions/getInputValueAtIndex";
import { useToggleSelectOpen } from "~/app/utils/functions/toggleSelectedOpen";
import { useIsSelectOpen } from "~/app/utils/functions/isSelectOpen";
import { useSearchParams } from "next/navigation";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";

export default function HeaderRowAndScrollDownContainer() {
  const [projectOptions] = useAtom(projectOptionsAtom);
  const isProjectOptions = !!projectOptions?.length;
  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const row = "projectRow";
  const inProfileHeader = true;
  const isValueInProjectInput = useIsValueInInput(row, "");
  const projectInputValueAtIndex = useGetInputValueAtIndex(
    undefined,
    row,
    inProfileHeader
  );
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
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
      <SelectInput
        isInProjectHeader
        type="text"
        placeholder={
          isProjectOptions
            ? "Selecione um projeto"
            : "Todos projetos da lista já foram criados"
        }
        id={row}
        onChange={(value) => handleInputChange(row, value)}
        hasValue={isValueInProjectInput}
        inputValue={projectInputValueAtIndex}
        setIsSelectOpen={toggleSelectOpen}
        readOnly={true}
      />

      {useIsSelectOpen(row) && !projectId && isProjectOptions && (
        <ScrollDownContainer row={row} />
      )}
    </Container>
  );
}
