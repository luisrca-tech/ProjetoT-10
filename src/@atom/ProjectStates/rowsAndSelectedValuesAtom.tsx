import { atom } from "jotai";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}
const initialRowsAndSelectedValuesState: RowsAndSelectedValueProps = {
  rows: ["row-0"],
  selectedValues: {},
};

export const rowsAndSelectedValuesAtom = atom(
  initialRowsAndSelectedValuesState,
);
