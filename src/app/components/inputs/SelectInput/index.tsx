import { useState } from "react";
import { Container, Input } from "./styles";
import ArrowDown from "../../../../../public/arrowdown.svg";
import ArrowRight from "../../../../../public/arrowright.svg";
import Image from "next/image";
import { useAtom } from "jotai";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";


export interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValue: boolean;
  values: { [key: string]: string };
  inputValue: string;
  isSelectOpen?: boolean;
  setIsSelectOpen?: (boolean: boolean) => void;
  value?: string;
  type: string;
}


export default function SelectInput({
  id,
  onChange,
  placeholder,
  hasValue,
  inputValue,
  isSelectOpen,
  setIsSelectOpen,
  ...rest
}: SelectInputProps) {
  const [checked] = useAtom(checkedAtom)

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    if (
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLInputElement
    ) {
      const newValue = event.target.value;

      onChange(newValue);
    }
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (setIsSelectOpen) {
      setIsSelectOpen(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    if (setIsSelectOpen) {
      setIsSelectOpen(false);
    }
  };

  return (
    <Container checked={checked}>
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
        onFocus={handleInputFocus}
      />

      {!hasValue ? (
        !isFocused ? (
          <Image src={ArrowRight} alt="" />
        ) : (
          <Image src={ArrowDown} alt="" />
        )
      ) : (
        ""
      )}
    </Container>
  );
}
