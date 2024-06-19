import {
  Container,
  InputsDataContainer,
  Footer,
  ValidationDateError,
} from "./styles";

import { FormHeader } from "./components/FormHeader";
import RowAndScrollDownContainer from "./components/RowAndScrollDownContainer";
import { BudgetContainer } from "./components/FooterSumContainer";
import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { rangesAtom } from "@/@atom/ProjectStates/rangesAtom";
import { poppins } from "@/app/fonts";
import { checkedAtom } from "@/@atom/ProjectStates/checkedAtom";

interface FormSelectInputProps {
  inputDataMenuClick: (row: string) => void;
}

interface SelectableRangeProps {
  startDate?: Date;
  endDate?: Date;
  isSelected?: boolean;
}

export default function FormSelectInput({
  inputDataMenuClick,
}: FormSelectInputProps) {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [ranges] = useAtom(rangesAtom);
  const [, setChecked] = useAtom(checkedAtom);

  function allDatesHaveValues(ranges: { [key: string]: SelectableRangeProps }) {
    const rangesPositions = Object.keys(ranges);

    const rangesExcludingLastAndGlobal = rangesPositions
      .filter((rangePosition) => rangePosition !== "global-project-data")
      .slice(0, -1);

    for (let range of rangesExcludingLastAndGlobal) {
      const value = ranges[range];
      if (value.startDate === undefined || value.endDate === undefined) {
        return false;
      }
    }

    return true;
  }

  const areAllDatesFilled = allDatesHaveValues(ranges);

  return (
    <Container>
      <FormHeader />

      <InputsDataContainer>
        {rowsAndSelectedValues.rows
          .slice()
          .reverse()
          .map((row) => (
            <RowAndScrollDownContainer
              row={row}
              key={row}
              inputDataMenuClick={inputDataMenuClick}
            />
          ))}

        {!areAllDatesFilled && (
          <ValidationDateError onClick={() => setChecked(true)}>
            <span className={poppins.className}>
              Preencha todas as datas antes de prosseguir!
            </span>
          </ValidationDateError>
        )}
      </InputsDataContainer>
      <Footer>
        <BudgetContainer />
      </Footer>
    </Container>
  );
}
