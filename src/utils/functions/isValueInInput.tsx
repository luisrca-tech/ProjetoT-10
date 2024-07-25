import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";

export function useIsValueInInput(row: string, inputName: string) {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const { selectedValues } = rowsAndSelectedValues;
  const textValue = selectedValues[`${inputName}${row}-text`];

  return textValue !== undefined && textValue.length > 0;
}
