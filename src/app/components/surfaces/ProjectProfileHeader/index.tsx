"use client";

import { useEffect, useRef, useState } from "react";
import {
  ButtonDataMenu,
  CalendarDateValues,
  Container,
  ContentContainer,
  DataContainer,
  HeaderBoxProfileImage,
  InputContent,
} from "./styles";

import { roboto } from "@/app/fonts";
import Image from "next/image";
import CalendarIcon from "../../../../../public/calendaricon.svg";
import { RiPencilFill } from "react-icons/ri";
import { ProjectProfileHeaderProps } from "@/app/types/componentsTypes/type";
import { Range } from "react-date-range";

export function ProjectProfileHeader({
  inputDataMenuClick,
  checked,
  ranges,
}: ProjectProfileHeaderProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = inputValue.split(" ");

  const initials = words.map((word) => word.charAt(0));

  const initialsString = initials.join("");

  useEffect(() => {
    const storedValue = localStorage.getItem("ProjectProfileInputHeader");
    if (storedValue !== null) {
      setInputValue(storedValue);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    localStorage.setItem("ProjectProfileInputHeader", newValue);
  };

  const handlePencilClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const formatDate = (date: Date | undefined) => {
    return date ? date.toLocaleDateString("pt-BR") : "";
  };

  return (
    <Container className={roboto.className}>
      <ContentContainer>
        <HeaderBoxProfileImage>
          {selectedFile ? (
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt="Imagem selecionada"
            />
          ) : (
            <span>{initialsString}</span>
          )}
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </HeaderBoxProfileImage>
        <InputContent>
          {checked ? (
            <strong>Duração:</strong>
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              ref={inputRef}
            />
          )}
          {checked ? (
            <DataContainer>
              {!ranges["global-project-data"].isSelected ? (
                <ButtonDataMenu
                  onClick={() => inputDataMenuClick("global-project-data")}
                >
                  <span>Datas</span>
                  <Image
                    src={CalendarIcon}
                    alt="Icone de calendário"
                    width={24}
                    height={24}
                  />
                </ButtonDataMenu>
              ) : (
                <CalendarDateValues
                  onClick={() => inputDataMenuClick("global-project-data")}
                >
                  <p>{formatDate(ranges["global-project-data"].startDate)}</p>
                  <span>-</span>
                  <p>{formatDate(ranges["global-project-data"].endDate)}</p>
                </CalendarDateValues>
              )}
            </DataContainer>
          ) : (
            <RiPencilFill size={24} onClick={handlePencilClick} />
          )}
        </InputContent>
      </ContentContainer>
    </Container>
  );
}
