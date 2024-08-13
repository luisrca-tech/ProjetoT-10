import { Container, Input } from "./styles";
import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { poppins } from "~/app/fonts";

interface SelectInputProps {
  id: string;
  onChange?: (value: string) => void;
  placeholder: string;
  hasValue: boolean;
  inputValue?: string;
  isSelectOpen?: boolean;
  setIsSelectOpen?: (boolean: boolean) => void;
  value?: string;
  type: string;
  isInProjectHeader?: boolean;
  isLastRow?: boolean;
  readOnly?: boolean;
}

export default function SelectInput({
  id,
  onChange,
  placeholder,
  hasValue,
  inputValue,
  setIsSelectOpen,
  isLastRow,
  readOnly,
  ...rest
}: SelectInputProps) {
  const [checked] = useAtom(checkedAtom);
  const showError = !isLastRow && hasValue === false ? true : false;

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLInputElement
    ) {
      const newValue = event.target.value;
      if (onChange) {
        onChange(newValue);
      }
    }
  };

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
        hasValue={hasValue}
        placeholder={placeholder}
        type={!rest.type ? "text" : rest.type}
        id={id}
        value={inputValue || ""}
        onChange={handleChange}
        onClick={handleInputFocus}
        className={poppins.className}
        showError={showError}
        readOnly={readOnly}
      />
    </Container>
  );
}
