import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";

type UseCanAddRowProps = {
  rowsUpdated: boolean;
};

export const useCanAddRow = ({ rowsUpdated }: UseCanAddRowProps) => {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);

  return () => {
    if (rowsUpdated) {
      const lastIndex =
        rowsAndSelectedValues.rows[rowsAndSelectedValues.rows.length - 1];
      const firstTextValue =
        rowsAndSelectedValues.selectedValues[
          `firstTextValue${lastIndex}-option`
        ];
      const secondTextValue =
        rowsAndSelectedValues.selectedValues[
          `secondTextValue${lastIndex}-text`
        ];
      const thirdTextValue =
        rowsAndSelectedValues.selectedValues[`thirdTextValue${lastIndex}-text`];

      return !!firstTextValue && !!secondTextValue && !!thirdTextValue;
    }
    return false;
  };
};
