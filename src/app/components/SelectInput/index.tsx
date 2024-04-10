"use client";
import { useEffect, useRef, useState } from "react";
import { Container, Input, SelectComponentContainer } from "./styles";

import { backgroundImages, position } from "polished";
import { SelectComponent } from "../SelectComponent";

interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValue: boolean;
  checked: boolean
}

export default function SelectInput({
  id,
  onChange,
  placeholder,
  hasValue,
  checked,
}: SelectInputProps) {
  const [value, setValue] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    if (
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLInputElement
    ) {
      const newValue = event.target.value;
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Container checked={checked}>
      <Input
        autoComplete="off"
        hasValue={hasValue}
        placeholder={placeholder}
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
      />
      <SelectComponentContainer>
        <SelectComponent
          hasValue={hasValue}
          id={id}
          value={value}
          onChange={handleChange}
        />
      </SelectComponentContainer>
=======
      <SelectComponent 
      id={id} 
      value={value} 
      onChange={handleChange}
      hasValue={hasValue}
      />
    </Container>
  );
}
