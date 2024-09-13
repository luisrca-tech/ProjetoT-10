import { poppins } from "~/app/fonts";
import { Container } from "./styles";
import { useInputDataMenuClick } from "~/utils/functions/inputDataMenuClick";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { useAtom } from "jotai";

type CalendarDateValuesProps = {
  row: string;
};
export function CalendarDateValues({ row }: CalendarDateValuesProps) {
  const { handleInputDataMenuClick } = useInputDataMenuClick();
  const [ranges] = useAtom(rangesAtom);
  const startDateRangeInCurrentRow = formatDate(ranges[row]?.startDate);
  const endDateRangeInCurrentRow = formatDate(ranges[row]?.endDate);

  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }

  return (
    <Container
      className={poppins.className}
      onClick={() => handleInputDataMenuClick(row)}
      type="button"
    >
      <p>{startDateRangeInCurrentRow}</p>
      <span>-</span>
      <p>{endDateRangeInCurrentRow}</p>
    </Container>
  );
}
