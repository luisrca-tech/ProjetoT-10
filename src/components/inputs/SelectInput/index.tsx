import { useState } from "react";
import { Container, Input } from "./styles";
import ArrowRight from "/public/images/arrowright.svg";
import ArrowDown from "/public/images/arrowdown.svg";
import Image, { type StaticImageData } from "next/image";
import { useAtom } from "jotai";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { poppins } from "~/assets/fonts/fonts";

interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValue: boolean;
  inputValue?: string;
  isSelectOpen?: boolean;
  setIsSelectOpen?: (boolean: boolean) => void;
  value?: string;
  type: string;
  isInProjectHeader?: boolean;
}

export default function SelectInput({
  id,
  onChange,
  placeholder,
  hasValue,
  inputValue,
  setIsSelectOpen,
  ...rest
}: SelectInputProps) {
  const [checked] = useAtom(checkedAtom);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
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
        onFocus={handleInputFocus}
        className={poppins.className}
      />

      {!hasValue ? (
        !isFocused ? (
          <Image src={ArrowRight as StaticImageData} alt="" />
        ) : (
          <Image src={ArrowDown as StaticImageData} alt="" />
        )
      ) : (
        ""
      )}
    </Container>
  );
}
