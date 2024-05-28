import { useEffect, useState } from "react";
import { BudgetContent, Container, ProjectDuration } from "./styles";
import { poppins } from "@/app/fonts";
import { eachDayOfInterval } from "date-fns";
import { BudgetContainerProps } from "@/app/types/componentsTypes/type";

export function BudgetContainer({
  rowsAndSelectedValues,
  ranges,
  checked,
}: BudgetContainerProps) {
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [totalDays, setTotalDays] = useState<number>(0);

  useEffect(() => {
    let totalHoursSum = 0;
    let totalValueSum = 0;

    rowsAndSelectedValues.rows.forEach((row: string) => {
      const hours = parseInt(
        rowsAndSelectedValues.selectedValues[`secondTextValue${row}`] || "0",
        10,
      );
      const value = parseInt(
        rowsAndSelectedValues.selectedValues[`thirdTextValue${row}`] || "0",
        10,
      );

      totalHoursSum += hours;
      totalValueSum += hours * value;
    });

    setTotalHours(totalHoursSum);
    setTotalValue(totalValueSum);
  }, [rowsAndSelectedValues]);

  useEffect(() => {
    let totalDaysSum = - 1;

    Object.keys(ranges).forEach((key: string) => {
      const range = ranges[key];
      if (range.startDate && range.endDate) {
        const daysArray = eachDayOfInterval({
          start: range.startDate,
          end: range.endDate,
        });
        totalDaysSum += daysArray.length;
      }
    });

    setTotalDays(totalDaysSum - 1)
  }, [ranges]);

  return (
    <Container>
      {checked ? (
        <>
          <ProjectDuration className={poppins.className}>
            <span>Duração do projeto:</span>
            <span>{totalDays} Dias</span>
          </ProjectDuration>
        </>
      ) : (
        <>
          <BudgetContent className={poppins.className}>
            <span>Total:</span>
          </BudgetContent>
          <BudgetContent>
            <span>{`${totalHours}h`}</span>
          </BudgetContent>
          <BudgetContent>
            <span>{`R$${totalValue},00`}</span>
          </BudgetContent>
        </>
      )}
    </Container>
  );
}
