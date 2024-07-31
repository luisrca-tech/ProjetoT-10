import { atom } from "jotai";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}
const initialRowsAndSelectedValuesState = {
  rows: ["row-0"],
  selectedValues: {},
};
export const rowsAndSelectedValuesAtom = atom<RowsAndSelectedValueProps>(
  initialRowsAndSelectedValuesState
);
