import * as React from "react";
import { Container } from "./styles";

export default function DateRangePickerInput() {
  const [value, setValue] = React.useState([null, null]);

  return (
    <Container>
      <input type="date" />
    </Container>
  );
}
