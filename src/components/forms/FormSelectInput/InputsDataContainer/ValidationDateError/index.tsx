import { poppins } from "~/app/fonts";
import { Container } from "./styles";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";

interface SelectableRangeProps {
  startDate?: Date;
  endDate?: Date;
  isSelected?: boolean;
}
export default function ValidationDateError() {
  const [ranges] = useAtom(rangesAtom);
  const areAllDatesFilled = allDatesHaveValues(ranges);
  const [, setChecked] = useAtom(checkedAtom);

  function allDatesHaveValues(ranges: { [key: string]: SelectableRangeProps }) {
    const rangesPositions = Object.keys(ranges);

    const rangesExcludingLastAndGlobal = rangesPositions
      .filter((rangePosition) => rangePosition !== "global-project-data")
      .slice(0, -1);

    for (let range of rangesExcludingLastAndGlobal) {
      const value = ranges[range];
      if (value?.startDate === undefined || value.endDate === undefined) {
        return false;
      }
    }

    return true;
  }

  return (
    <>
      {!areAllDatesFilled && (
        <Container>
          <button type="button" onClick={() => setChecked(true)}>
            <span className={poppins.className}>
              Preencha todas as datas antes de prosseguir!
            </span>
          </button>
        </Container>
      )}
    </>
  );
}
