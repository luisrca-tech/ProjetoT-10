"use client";

import Image from "next/image";
import { poppins } from "~/app/fonts";
import { Container, MessagesContainer } from "./styles";
import alertError from "/public/alertError.svg";
import alertSuccess from "/public/alertSuccess.svg";
import alertWarning from "/public/alertWarning.svg";

type ToastAlert = {
  status: "error" | "success" | "warning";
  message: string;
  justifyMessage?: string;
};

export default function ToastAlert({
  status,
  message,
  justifyMessage,
}: ToastAlert) {
  let correctIconAlert =
    status === "success"
      ? alertSuccess
      : status === "error"
      ? alertError
      : alertWarning;

  return (
    <Container status={status}>
      <Image src={correctIconAlert} alt="alert image" height={23} width={23} />

      <MessagesContainer className={poppins.className}>
        <span>{message}</span>
        <span>{justifyMessage}</span>
      </MessagesContainer>
    </Container>
  );
}
