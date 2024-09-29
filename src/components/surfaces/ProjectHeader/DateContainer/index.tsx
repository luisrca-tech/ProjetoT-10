import { poppins } from "~/app/fonts";
import { Container, DatesContainer } from "./styles";
import { type ProjectDates } from "~/server/types/Clickup.type";
type DateContainer = {
  projectDates: ProjectDates;
};
export default function DateContainer({ projectDates }: DateContainer) {
  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }
  const globalProjectStartDate = formatDate(projectDates.minStartDateObj);
  const globalProjectEndDate = formatDate(projectDates.maxEndDateObj);
  return (
    <Container>
      <strong className={poppins.className}>Duração:</strong>
      <DatesContainer>
        <p className={poppins.className}>{globalProjectStartDate}</p>
        <span>-</span>
        <p className={poppins.className}>{globalProjectEndDate}</p>
      </DatesContainer>
    </Container>
  );
}
