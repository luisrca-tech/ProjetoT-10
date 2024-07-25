import { BudgetContent, Container, ProjectDuration } from "./styles";
import { poppins } from "~/app/fonts";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { useAtom } from "jotai";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";

export function BudgetContainer() {
  const [checked] = useAtom(checkedAtom);
  const [ranges] = useAtom(rangesAtom);
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);

  const totalHoursSum = rowsAndSelectedValues.rows.reduce(
    (acc, row) => {
      const hours = parseInt(
        rowsAndSelectedValues.selectedValues[`secondTextValue${row}-text`] ||
          "0",
        10
      );
      const value = parseInt(
        rowsAndSelectedValues.selectedValues[`thirdTextValue${row}-text`] ||
          "0",
        10
      );
      acc.hours += hours;
      acc.value += hours * value;
      return acc;
    },
    { hours: 0, value: 0 }
  );

  const { hours: totalHours, value: totalValue } = totalHoursSum;
  const startDate = ranges["global-project-data"]?.startDate;
  const endDate = ranges["global-project-data"]?.endDate;

  const totalDays =
    startDate && endDate
      ? (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      : 0;

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
