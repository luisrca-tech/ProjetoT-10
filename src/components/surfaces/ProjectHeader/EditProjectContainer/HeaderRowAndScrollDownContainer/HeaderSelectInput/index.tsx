"use client"

import { useAtom } from "jotai";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { poppins } from "~/assets/fonts/fonts";
import { Skeleton } from "~/components/widgets/Skeleton";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { useGetInputValueAtIndex } from "~/utils/functions/getInputValueAtIndex";
import { Container, Input } from "./styles";

interface SelectInputProps {
  isSelectOpen?: boolean;
  setIsSelectOpen?: (boolean: boolean) => void;
  row: string;
}

export default function HeaderSelectInput({
  setIsSelectOpen,
  row,
  ...rest
}: SelectInputProps) {
  const { getTasksInfos } = useTasksOfProject();

  const projectAttributes = getTasksInfos();
  const [checked] = useAtom(checkedAtom);
  const [, setProjectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [projectOptions] = useAtom(projectOptionsAtom);
  const isProjectOptions = !!projectOptions?.length;
  const correctPlaceHolder = isProjectOptions
    ? "Selecione um projeto"
    : "Todos os projetos foram criados!";

  const projectHeaderInputValueAtIndex = useGetInputValueAtIndex(
    undefined,
    row,
    true
  );

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

  const handleInputFocus = () => {
    if (setIsSelectOpen) {
      setIsSelectOpen(true);
    }
  };

  const handleInputBlur = () => {
    if (setIsSelectOpen) {
      setIsSelectOpen(false);
    }
  };

  return (
    <Container checked={checked} isInProjectHeader>
      {!!projectAttributes ? (
        <Input
          {...rest}
          onBlur={handleInputBlur}
          autoComplete="off"
          placeholder={correctPlaceHolder}
          type="text"
          value={projectHeaderInputValueAtIndex || ""}
          onChange={() => handleInputChange}
          onClick={handleInputFocus}
          className={poppins.className}
          readOnly={true}
        />
      ) : (
        <Skeleton
          style={{ alignSelf: "flex-start", marginTop: "0.875rem" }}
          width="90%"
          height="1.2rem"
        />
      )}
    </Container>
  );
}
