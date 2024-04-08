"use client";
import { useState } from "react";

interface SelectInputProps {
  id: string;
  onChange: (value: string) => void;
}

export default function SelectInput({ id, onChange }: SelectInputProps) {
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
    <>
      <select id={id} value={value} onChange={handleChange}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <input type="text" id={id} value={value} onChange={handleChange} />
    </>
  );
}
