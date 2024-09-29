import { useMemo } from "react";
import { type TasksInfosType } from "~/server/types/Clickup.type";

export const useGetTotalHoursAndValue = (tasksCustomFields: TasksInfosType) => {
  return useMemo(() => {
    if (!tasksCustomFields) {
      return { totalHours: 0, totalValue: 0 };
    }

    const { totalHours, totalValue } = tasksCustomFields.reduce(
      (acc, task) => {
        const hours = Array.isArray(task.hours)
          ? task.hours.reduce((sum, h) => sum + parseFloat(h), 0)
          : task.hours;

        const valueByHour = Array.isArray(task.valueByHour)
          ? task.valueByHour.reduce((prod, v) => prod * parseFloat(v), 1)
          : task.valueByHour;

        acc.totalHours += hours;
        acc.totalValue += hours * valueByHour;

        return acc;
      },
      { totalHours: 0, totalValue: 0 }
    );

    return { totalHours, totalValue };
  }, [tasksCustomFields]);
};
