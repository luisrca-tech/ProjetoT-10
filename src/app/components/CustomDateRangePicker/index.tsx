// import "rsuite/DateRangePicker/styles/index.css";
import "./DateRangePicker.css";
import { Container } from "./styles";

import React, { useContext, useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { ptBR } from "date-fns/locale";
import { ScrolldownContext } from "@/contexts/ScrolldownContext";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CustomDateRangePicker() {
  const { value, handleSelectDate } = useContext(ScrolldownContext);

  return (
    <Container>
      <DateRangePicker
        onChange={handleSelectDate}
        moveRangeOnFirstSelection={false}
        months={12}
        ranges={value}
        direction="vertical"
        locale={ptBR}
      />
    </Container>
  );
}
