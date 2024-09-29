import { Container } from "./styles";
import { poppins } from "~/app/fonts";
import { type ProjectDates } from "~/server/types/Clickup.type";

export default function CalendarDateValues(projectDates: ProjectDates) {
  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }
  const globalProjectStartDate = formatDate(projectDates.minStartDateObj);
  const globalProjectEndDate = formatDate(projectDates.maxEndDateObj);

  return (
    <Container>
      <p className={poppins.className}>{globalProjectStartDate}</p>
      <span>-</span>
      <p className={poppins.className}>{globalProjectEndDate}</p>
    </Container>
  );
}
