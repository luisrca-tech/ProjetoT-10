import { useEffect, useState } from "react";
import { BudgetContent, Container } from "./styles";
import { poppins } from "@/app/fonts";
import { BudgetContainerProps } from "@/app/types/componentsTypes/type";

export function BudgetContainer({
  rowsAndSelectedValues,
}: BudgetContainerProps) {
  const [totalHours, setTotalHours] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);

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

  return (
    <Container>
      <BudgetContent className={poppins.className}>
        <span>Total:</span>
      </BudgetContent>
      <BudgetContent>
        <span>{`${totalHours}h`}</span>
      </BudgetContent>
      <BudgetContent>
        <span>{`R$${totalValue},00`}</span>
      </BudgetContent>
    </Container>
  );
}
