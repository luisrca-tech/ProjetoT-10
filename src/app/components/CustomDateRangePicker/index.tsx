// import "rsuite/DateRangePicker/styles/index.css";
import "./DateRangePicker.css";
import { Container } from "./styles";

import React, { useState } from "react";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CustomDateRangePicker() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  return (
    <Container>
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        months={3}
        ranges={state}
        direction="vertical"
      />
    </Container>
  );
}
