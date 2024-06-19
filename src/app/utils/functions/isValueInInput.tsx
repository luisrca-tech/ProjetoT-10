import { rowsAndSelectedValuesAtom } from "@/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useAtom } from "jotai";

export function useIsValueInInput(
  row: string,
  inputName: string,
  inProfileHeader?: boolean,
) {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const { selectedValues } = rowsAndSelectedValues;
  const textValue = selectedValues[`${inputName}${row}-text`];

  return textValue !== undefined && textValue.length > 0;
}
