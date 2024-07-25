import { atom } from "jotai";
import { type Range } from "react-date-range";

export interface SelectableRangeProps extends Range {
  isSelected?: boolean;
}

const initialRangesState: { [key: string]: SelectableRangeProps } = {
  "global-project-data": {
    startDate: undefined,
    endDate: undefined,
    key: "selection-global-project-data",
    isSelected: false,
  },
  "row-0": {
    startDate: undefined,
    endDate: undefined,
    key: "selection-row-0",
    isSelected: false,
  },
};

export const rangesAtom = atom(initialRangesState);
