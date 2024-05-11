"use client";

import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import "./DateRangePicker.css";
import { Container } from "./styles";
import { use, useState } from "react";

export function CustomDateRangePicker() {
  const RsStack = document.querySelector("#picker-popup");

  if (RsStack) {
    const divs = RsStack.querySelectorAll("div");

    divs.forEach((div) => {
      div.style.position = "none"
      div.style.left = "none"
    });
  }

  const RsPicker = document.querySelector(".rs-picker-daterange-panel");

  if (RsPicker) {
    const divs = RsPicker.querySelectorAll("div");

    divs.forEach((div) => {
      div.style.minWidth = "none";
    });
  }

  const ptBR = {
    sunday: "Dom",
    monday: "Seg",
    tuesday: "Ter",
    wednesday: "Qua",
    thursday: "Qui",
    friday: "Sex",
    saturday: "Sáb",
  };

  return (
    <Container>
      <DateRangePicker
        placeholder={`Data inicial ${"           "} | ${"         "} Data final`}
        editable={true}
        showHeader={true}
        format={`${"            "}dd/MM/yyyy ${"            "}`}
        locale={ptBR}
        isoWeek
      />
    </Container>
  );
}
