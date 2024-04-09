"use client";

import { Container, CustomFormSelect, Option } from "./styles";
import React, { ChangeEvent, useState } from "react";

import Image from "next/image";

interface SelectComponentProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function SelectComponent({ id, value, onChange }: SelectComponentProps) {
  const [onSelectOpen, setOnSelectOpen] = useState(false);

  function handleImageClick() {
    setOnSelectOpen(!onSelectOpen);
  }

  return (
    <Container>
      <CustomFormSelect
        onClick={handleImageClick}
        value={value}
        onChange={onChange}
        id={id}
        size="sm"
      >
        <Option>Front-end</Option>
        <Option>Back-end</Option>
      </CustomFormSelect>
      {onSelectOpen ? (
        <Image src={"../../../../public/arrowdown.svg"} alt="" />
      ) : (
        <Image src={"../../../../public/arrowright.svg"} alt="" />
      )}
    </Container>
  );
}
