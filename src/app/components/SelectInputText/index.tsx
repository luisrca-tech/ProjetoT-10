"use client";

import ArrowRight from "../../../../public/arrowright.svg";

import { useState } from "react";
import {
  Container,
  Input,
  InputContainer,
  Select,
  SelectContainer,
} from "./styles";
import Image from "next/image";

interface SelectInputTextProps {
  options?: string[];
  placeholder: string;
  optionId: number;
  
}

export function SelectInputText({
  placeholder,
  options,
  optionId,
}: SelectInputTextProps) {
  const [isSelect, setIsSelect] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setValue(event.target.value);
  };

  const toggleInputType = () => {
    setIsSelect(!isSelect);
  };

  return (
    <Container>
      {isSelect ? (
        <SelectContainer>
          <Select value={value} onChange={handleChange}>
            {options?.map((option, optionId) => (
              <option key={optionId} value={option}>
                {option}
              </option>
            ))}
          </Select>
          <button onClick={toggleInputType}>
            <Image src={ArrowRight} alt="" />
          </button>
        </SelectContainer>
      ) : (
        <InputContainer>
          <Input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
          <button onClick={toggleInputType}>
            <Image src={ArrowRight} alt="" />
          </button>
        </InputContainer>
      )}
    </Container>
  );
}
