"use client";
import { useRef, useState } from "react";
import { Container } from "./styles";

import { backgroundImages, position } from "polished";
import { SelectComponent } from "../SelectComponent";

interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  hasValue: boolean;
}

export default function SelectInput({
  id,
  onChange,
  placeholder,
  hasValue,
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
    <Container hasValue={hasValue}>
      <input
        placeholder={placeholder}
        type="text"
        id={id}
        value={value}
        onChange={handleChange}
      />
      <SelectComponent id={id} value={value} onChange={handleChange} />
    </Container>
  );
}
