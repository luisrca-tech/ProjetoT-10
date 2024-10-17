import { lastDayOfMonth } from "date-fns";
import { type TasksInfosType } from "~/server/types/Clickup.type";

export function useForecast() {
  function calculateMonthlyForecasts(tasks: TasksInfosType) {
    if (!tasks) return [];

    return tasks.map((task) => {
      const { taskStartDate, taskDueDate, hours, valueByHour } = task;

      const startDate = new Date(taskStartDate);
      const dueDate = new Date(taskDueDate);

      const firstMonthLastDay = lastDayOfMonth(startDate);
      const lastMonthLastDay = lastDayOfMonth(dueDate);

      const hoursNumber = Array.isArray(hours)
        ? parseFloat(hours[0]?.toString() || "0")
        : parseFloat(hours?.toString() || "0");
      const valueByHourNumber = Array.isArray(valueByHour)
        ? parseFloat(valueByHour[0]?.toString() ?? "0")
        : parseFloat(valueByHour?.toString() ?? "0") || 0;

      const firstMonthCalculation =
        ((firstMonthLastDay.getDate() - startDate.getDate()) /
          firstMonthLastDay.getDate()) *
        hoursNumber *
        valueByHourNumber;

      const secondMonthCalculation =
        startDate.getMonth() !== dueDate.getMonth()
          ? hoursNumber * valueByHourNumber
          : null;

      const thirdMonthCalculation =
        startDate.getMonth() !== dueDate.getMonth() &&
        (dueDate.getDate() / lastMonthLastDay.getDate()) *
          hoursNumber *
          valueByHourNumber;

      return {
        taskId: task.taskId,
        firstMonthCalculation: firstMonthCalculation || null,
        secondMonthCalculation: secondMonthCalculation || null,
        thirdMonthCalculation: thirdMonthCalculation || null,
      };
    });
  }
  return { calculateMonthlyForecasts };
}
