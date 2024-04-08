"use client";

import { z } from "zod";
import {
  Container,
  ContentContainer,
  HeaderBoxProfileImage,
  InputContent,
} from "./styles";
import { RiPencilFill } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { roboto } from "@/app/fonts";
import Image from "next/image";

interface ProjectProfileProps {
  value: string;
  checked: boolean;
}

export function ProjectProfileHeader({ value, checked }: ProjectProfileProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Divide a string em palavras
  const words = inputValue.split(" ");

  // Mapeie sobre as palavras e pegue  o primeiro caractere de cada uma
  const initials = words.map((word) => word.charAt(0));

  // Junte os caracteres iniciais em uma única string
  const initialsString = initials.join("");

  // Define o valor inicial do input ao montar o componente
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

  // Atualiza o valor do input e armazena no localStorage
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
            <input type="date" placeholder="Datas" />
          ) : (
            <RiPencilFill size={24} onClick={handlePencilClick} />
          )}
        </InputContent>
      </ContentContainer>
    </Container>
  );
}
