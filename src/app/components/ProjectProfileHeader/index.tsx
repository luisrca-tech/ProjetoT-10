"use client";

import { useContext, useEffect, useRef, useState } from "react";
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
import CalendarIcon from "../../../../public/calendaricon.svg";
import { RiPencilFill } from "react-icons/ri";
import { ScrolldownContext } from "@/contexts/ScrolldownContext";
import { Range } from "react-date-range";

interface ProjectProfileProps {
  inputName: string;
  setStringRow: React.Dispatch<React.SetStateAction<string>>;
  value: { [key: string]: Range };
}

export function ProjectProfileHeader({
  inputName,
  setStringRow,
  value,
}: ProjectProfileProps) {
  const { checked, toggleDatePicker, hasDateValue, toggleEditPicker } =
    useContext(ScrolldownContext);

  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const words = inputValue.split(" ");

  const initials = words.map((word) => word.charAt(0));

  const initialsString = initials.join("");
  const { isDatePickerOpen, openDatePicker } = useContext(ScrolldownContext);

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

  function InputDataMenuClick(row: string) {
    openDatePicker();
    setStringRow(row);
  }
  let la = "global-project-data";
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
              {!value["global-project-data"] ? (
                <ButtonDataMenu
                  onClick={() => InputDataMenuClick("global-project-data")}
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
                  onClick={() => InputDataMenuClick("global-project-data")}
                >
                  <p>{formatDate(value["global-project-data"].startDate)}</p>
                  <span>-</span>
                  <p>{formatDate(value["global-project-data"].endDate)}</p>
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
