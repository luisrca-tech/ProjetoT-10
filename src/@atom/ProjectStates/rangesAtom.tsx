import { atom } from "jotai";
import { type Range } from "react-date-range";

export interface SelectableRangePropsType extends Range {
  isSelected?: boolean;
}

const initialRangesState: { [key: string]: SelectableRangePropsType } = {
  "global-project-data": {
    startDate: undefined,
    endDate: undefined,
    key: "selection-global-project-data",
    isSelected: false,
  },
};

export const rangesAtom = atom(initialRangesState);
