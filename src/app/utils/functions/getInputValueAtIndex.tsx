import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { useAtom } from "jotai";

export function useGetInputValueAtIndex(
  linePrefix?: string,
  row?: string,
  inProfileHeader?: boolean
) {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);

  if (inProfileHeader) {
    const { selectedValue } = projectSelectedValue;
    const inputValue = selectedValue[`${row}-text`];

    return inputValue;
  }

  const inputValue =
    rowsAndSelectedValues.selectedValues[`${linePrefix}${row}-text`];

  return inputValue;
}
