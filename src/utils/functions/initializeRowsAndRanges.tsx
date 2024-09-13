import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { v4 as uuidv4 } from "uuid";

type useInitializeRowsAndRangesType = {
  canInitializeRowsAndRanges: boolean;
};
export const useInitializeRowsAndRanges = ({
  canInitializeRowsAndRanges,
}: useInitializeRowsAndRangesType) => {
  const [, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [, setRanges] = useAtom(rangesAtom);

  return () => {
    if (canInitializeRowsAndRanges) {
      const rowKey = uuidv4();
      const newRow = `row-${rowKey}`;

      setRowsAndSelectedValues((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
        selectedValues: {
          ...prevState.selectedValues,
          [`firstTextValue${newRow}-text`]: "",
          [`secondTextValue${newRow}-text`]: "",
          [`thirdTextValue${newRow}-text`]: "",
        },
      }));

      setRanges((prevState) => ({
        ...prevState,
        [newRow]: {
          startDate: undefined,
          endDate: undefined,
          key: `selection-row-${rowKey}`,
          isSelected: false,
        },
      }));
    }
  };
};
