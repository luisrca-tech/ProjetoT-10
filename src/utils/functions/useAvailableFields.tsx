import { type TasksInfosType } from "~/server/types/Clickup.type";

export function useAvailableFields(tasksCustomFields: TasksInfosType) {
  const filteredFields =
    tasksCustomFields?.map(({ chargeName, hours, valueByHour }) => ({
      chargeName,
      hours,
      valueByHour,
    })) || [];

  const totalHoursSum = filteredFields.reduce(
    (acc, current) => {
      if (
        typeof current.hours === "string" &&
        typeof current.valueByHour === "string"
      ) {
        const hours = parseFloat(current.hours);
        const value = parseFloat(current.valueByHour);
        acc.hours += hours;
        acc.value += hours * value;
      }

      return acc;
    },
    { hours: 0, value: 0 }
  );

  const formattedTotalValue = totalHoursSum.value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return {
    totalValue: formattedTotalValue,
    filteredFields,
    totalHours: totalHoursSum.hours,
  };
}
