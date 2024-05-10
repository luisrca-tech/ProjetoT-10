"use client";

import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import "./DateRangePicker.css";
import { Container } from "./styles";
import { use, useState } from "react";

import { enGB } from "date-fns/locale";

export function CustomDateRangePicker() {
  const [format, setFormat] = useState<string>(
    `Data inicial ${"               "} | ${"             "} Data final`,
  );

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
