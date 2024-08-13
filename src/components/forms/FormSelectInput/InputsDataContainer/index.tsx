import { useAtom } from "jotai";
import { Container } from "./styles";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import RowAndScrollDownContainer from "../RowAndScrollDownContainer";
import ValidationDateError from "./ValidationDateError";

export default function InputsDataContainer() {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const rows = rowsAndSelectedValues.rows;
  return (
    <Container>
      {rows
        .slice()
        .reverse()
        .map((row) => (
          <RowAndScrollDownContainer row={row} key={row} />
        ))}

      <ValidationDateError />
    </Container>
  );
}
