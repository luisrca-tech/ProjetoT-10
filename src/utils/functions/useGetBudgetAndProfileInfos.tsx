import { type TasksCustomFieldsType } from "~/server/types/Clickup.type";
import { useGetMinAndMaxDates } from "./useGetMinAndMaxDates";

export function useGetBudgetAndProfileInfos(
  tasksCustomFields: TasksCustomFieldsType
) {
  const newRanges: Record<string, any> = {};

  tasksCustomFields?.forEach((task) => {
    const rowKey = `row${task.taskId}`;

    newRanges[rowKey] = {
      startDate: task.taskStartDate,
      endDate: task.taskDueDate,
    };
  });

  let minStartDate = undefined;
  let maxEndDate = undefined;

  for (let key in newRanges) {
    const range = newRanges[key];
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

  const minAndMaxDates = useGetMinAndMaxDates(newRanges);
  const minStartDateObj = minAndMaxDates.minStartDateObj;
  const maxEndDateObj = minAndMaxDates.maxEndDateObj;

  const totalDays =
    minStartDateObj && maxEndDateObj
      ? (maxEndDateObj.getTime() - minStartDateObj.getTime()) /
        (1000 * 60 * 60 * 24)
      : 0;

  const { totalHours, totalValue } = tasksCustomFields?.reduce(
    (acc, task) => {
      const hours = Array.isArray(task.hours)
        ? task.hours.reduce((sum, h) => sum + parseFloat(h), 0)
        : typeof task.hours === "number"
        ? task.hours
        : parseFloat(task.hours);

      const valueByHour = Array.isArray(task.valueByHour)
        ? task.valueByHour.reduce((prod, v) => prod * parseFloat(v), 1)
        : typeof task.valueByHour === "number"
        ? task.valueByHour
        : parseFloat(task.valueByHour);

      acc.totalHours += hours;
      acc.totalValue += hours * valueByHour;

      return acc;
    },
    { totalHours: 0, totalValue: 0 }
  ) ?? { totalHours: 0, totalValue: 0 };

  return { totalDays, totalHours, totalValue, minStartDateObj, maxEndDateObj };
}
