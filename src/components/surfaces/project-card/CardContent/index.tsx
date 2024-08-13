"use client";

import { poppins } from "~/app/fonts";
import { Container, CardContentDescriptions } from "./styles";
import GoogleImage from "/public/images/google img.svg";

import Image, { type StaticImageData } from "next/image";
import { type ProjectOptionType } from "~/server/types/Clickup.type";
type CardContentType = {
  project: ProjectOptionType;
  dates:
    | {
        minStartDate: number | null;
        maxEndDate: number | null;
      }
    | undefined;
};
export function CardContent({ project, dates }: CardContentType) {
  function formatDate(timestamp: number | null): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleDateString("pt-BR");
  }
  return (
    <Container>
      <Image
        src={GoogleImage as StaticImageData}
        alt="Imagem logo da google"
        color="#F7F2FA"
      />
      <CardContentDescriptions className={poppins.className}>
        <strong>{project.label}</strong>

        <p>
          <span>Duração</span>:{}
          <span>{dates && formatDate(dates.minStartDate)}</span>
          <span>-</span>
          <span>{dates && formatDate(dates.maxEndDate)}</span>
        </p>
      </CardContentDescriptions>
    </Container>
  );
}