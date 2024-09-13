import { atom } from "jotai";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}
const initialRowsAndSelectedValuesState = {
  rows: [],
  selectedValues: {},
};
export const rowsAndSelectedValuesAtom = atom<RowsAndSelectedValueProps>(
  initialRowsAndSelectedValuesState
);
