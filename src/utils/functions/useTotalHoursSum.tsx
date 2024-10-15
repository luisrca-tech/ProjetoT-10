import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";

export function useTotalHoursSum() {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const totalHoursSum = rowsAndSelectedValues.rows.reduce(
    (acc, row) => {
      const hours = parseFloat(
        rowsAndSelectedValues.selectedValues[`secondTextValue${row}-text`] ||
          "0"
      );
      const value = parseFloat(
        rowsAndSelectedValues.selectedValues[`thirdTextValue${row}-text`] || "0"
      );
      acc.hours += hours;
      acc.value += hours * value;
      return acc;
    },
    { hours: 0, value: 0 }
  );

  return { totalHours: totalHoursSum.hours, totalValue: totalHoursSum.value };
}
