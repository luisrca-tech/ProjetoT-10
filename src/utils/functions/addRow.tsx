import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { v4 as uuidv4 } from "uuid";

export const useAddRow = () => {
  const [, setRowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [, setRanges] = useAtom(rangesAtom);

  return () => {
    const rowKey = uuidv4();
    const newDateRange = {
      startDate: undefined,
      endDate: undefined,
      key: `selection-row-${rowKey}`,
      isSelected: false,
    };

    setRowsAndSelectedValues((prevState) => ({
      ...prevState,
      rows: [...prevState.rows, `row-${rowKey}`],
      selectedValues: {
        ...prevState.selectedValues,
        [`reqMethodrow-${rowKey}`]: "POST",
      },
    }));

    setRanges((prevState) => ({
      ...prevState,
      [`row-${rowKey}`]: newDateRange,
    }));
  };
};
