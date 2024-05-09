"use client";

import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";
import "./DateRangePicker.css";
import { Container } from "./styles";

export function CustomDateRangePicker() {
  return (
    <Container>
      <DateRangePicker
        className="rs-picker-daterange-panel"
        placeholder={`Data inicial ${"               "} | ${"             "} Data final`}
        editable={true}
        showHeader={true}
        format="dd-MM-yyyy"
        style={{ minWidth: "none" }}
      />
    </Container>
  );
}
