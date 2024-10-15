import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";

export function useTotalDaysCalc() {
  const [ranges] = useAtom(rangesAtom);
  const startDate = ranges["global-project-data"]?.startDate;
  const endDate = ranges["global-project-data"]?.endDate;

  const totalDays =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  return totalDays;
}
