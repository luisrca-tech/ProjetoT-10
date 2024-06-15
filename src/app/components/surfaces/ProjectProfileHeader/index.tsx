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
  EditProjectContainer,
} from "./styles";
import HeaderRowAndScrollDownContainer from "./components/HeaderRowAndScrollDownContainer";
import { roboto } from "@/app/fonts";
import Image from "next/image";
import CalendarIcon from "../../../../../public/calendaricon.svg";
import { RiPencilFill } from "react-icons/ri";
import { useAtom } from "jotai";
import { rangesAtom } from "@/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";
import { projectSelectedValuePropAtom } from "@/@atom/ProjectStates/projectSelectedValue";
interface ProjectProfileHeaderProps {
  inputDataMenuClick: (row: string) => void;
}

export function ProjectProfileHeader({
  inputDataMenuClick,
}: ProjectProfileHeaderProps) {
  const [ranges] = useAtom(rangesAtom);
  const [checked] = useAtom(checkedAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const words =
    projectSelectedValue?.selectedValues[`projectRow-text`]?.split(" ");

  const initials = words?.map((word) => word.charAt(0));

  const initialsString = initials?.join("");

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
            <span>{initialsString?.toUpperCase()}</span>
          )}
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </HeaderBoxProfileImage>
        <InputContent checked={checked}>
          {!checked ? (
            <EditProjectContainer>
              <HeaderRowAndScrollDownContainer />
              <div>
                <RiPencilFill size={24} onClick={handlePencilClick} />
              </div>
            </EditProjectContainer>
          ) : (
            <DataContainer>
              <strong>Duração:</strong>
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
          )}
        </InputContent>
      </ContentContainer>
    </Container>
  );
}
