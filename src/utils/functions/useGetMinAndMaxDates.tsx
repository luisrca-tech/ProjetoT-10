import { useMemo } from "react";
import { type SelectableRangePropsType } from "~/@atom/ProjectStates/rangesAtom";

type RangeType = {
  startDate: Date;
  endDate: Date;
};

type RangesType =
  | Record<string, RangeType>
  | {
      [key: string]: SelectableRangePropsType;
    };

export function useGetMinAndMaxDates(ranges: RangesType) {
  let minStartDate: number | undefined = undefined;
  let maxEndDate: number | undefined = undefined;

  for (let key in ranges) {
    const range = ranges[key];
    if (range?.startDate) {
      const startDate = range.startDate.getTime();
      if (minStartDate === undefined || startDate < minStartDate) {
        minStartDate = startDate;
      }
    }
    if (range?.endDate) {
      const endDate = range.endDate.getTime();
      if (maxEndDate === undefined || endDate > maxEndDate) {
        maxEndDate = endDate;
      }
    }
  }

  const minStartDateObj = useMemo(
    () => (minStartDate !== undefined ? new Date(minStartDate) : undefined),
    [minStartDate]
  );

  const maxEndDateObj = useMemo(
    () => (maxEndDate !== undefined ? new Date(maxEndDate) : undefined),
    [maxEndDate]
  );

  return { minStartDateObj, maxEndDateObj };
}
