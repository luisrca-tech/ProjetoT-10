"use client";

import { poppins } from "~/app/fonts";
import { Separate } from "~/components/surfaces/AvailableFieldsTable/styles";
import { monthNames } from "~/constants/Months";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { type TasksInfosType } from "~/server/types/Clickup.type";
import { useForecast } from "~/utils/functions/useForecast";
import { ForecastContainer, ForecastMonths, ForecastSummary } from "./styles";

export function MonthlyForecastTable() {
  const { getTasksInfos } = useTasksOfProject();
  const tasksCustomFields: TasksInfosType = getTasksInfos();
  const { calculateMonthlyForecasts } = useForecast();
  const monthlyForecasts = calculateMonthlyForecasts(tasksCustomFields);

  return (
    <>
      {tasksCustomFields?.slice(0, 1).map((task, index) => {
        const taskStartDate = new Date(task.taskStartDate);
        const startMonth = taskStartDate.getMonth();

        return (
          <ForecastContainer key={task.taskId}>
            {/* map */}
            <ForecastMonths>
              {monthlyForecasts[index]?.firstMonthCalculation !== null && (
                <span>{monthNames[startMonth % 12]}</span>
              )}
              {monthlyForecasts[index]?.secondMonthCalculation !== null && (
                <span>{monthNames[(startMonth + 1) % 12]}</span>
              )}
              {monthlyForecasts[index]?.thirdMonthCalculation !== null && (
                <span>{monthNames[(startMonth + 2) % 12]}</span>
              )}
            </ForecastMonths>
            <Separate />
            {/* map */}
            <ForecastSummary className={poppins.className}>
              {monthlyForecasts[index]?.firstMonthCalculation !== null && (
                <span>
                  R$ {monthlyForecasts[index]?.firstMonthCalculation.toFixed(2)}
                </span>
              )}
              {monthlyForecasts[index]?.secondMonthCalculation !== null && (
                <span>
                  R${" "}
                  {monthlyForecasts[index]?.secondMonthCalculation.toFixed(2)}
                </span>
              )}
              {monthlyForecasts[index]?.thirdMonthCalculation !== null && (
                <span>
                  R$ {monthlyForecasts[index]?.thirdMonthCalculation.toFixed(2)}
                </span>
              )}
            </ForecastSummary>
          </ForecastContainer>
        );
      })}
    </>
  );
}
