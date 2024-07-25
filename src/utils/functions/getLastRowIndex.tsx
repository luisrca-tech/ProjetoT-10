import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import { useAtom } from "jotai";

export function useGetLastRowIndex() {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const rows = rowsAndSelectedValues.rows;
  return rows[rows.length - 1];
}
