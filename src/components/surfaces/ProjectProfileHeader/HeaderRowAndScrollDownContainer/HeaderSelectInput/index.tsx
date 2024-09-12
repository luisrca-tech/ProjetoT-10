import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { poppins } from "~/assets/fonts/fonts";
import { Container, Input } from "./styles";
import { useGetInputValueAtIndex } from "~/utils/functions/getInputValueAtIndex";
import { projectOptionsAtom } from "~/@atom/api/CustomFields/projectOptionsAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";

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
    </Container>
  );
}
