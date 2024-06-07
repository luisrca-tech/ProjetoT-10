import { atom } from 'jotai';
import { Range } from 'react-date-range';

export interface SelectableRangeProps extends Range {
  isSelected?: boolean;
}


const initialRangesState: { [key: string]: SelectableRangeProps } = {
  "global-project-data": {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection-global-project-data",
    isSelected: false,
  },
  "row-0": {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection-row-0",
    isSelected: false,
  },
};

export const rangesAtom = atom(initialRangesState);