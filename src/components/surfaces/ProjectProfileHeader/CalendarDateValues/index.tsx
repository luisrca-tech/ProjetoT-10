import { useAtom } from "jotai";
import { Container } from "./styles";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { poppins } from "~/app/fonts";

export default function CalendarDateValues() {
  const [ranges] = useAtom(rangesAtom);
  const globalProjectStartDate = ranges["global-project-data"]?.startDate;
  const globalProjectEndDate = ranges["global-project-data"]?.endDate;

  function formatDate(date: Date | undefined) {
    return date ? date.toLocaleDateString("pt-BR") : "";
  }

  return (
    <Container>
      <p className={poppins.className}>{formatDate(globalProjectStartDate)}</p>
      <span>-</span>
      <p className={poppins.className}>{formatDate(globalProjectEndDate)}</p>
    </Container>
  );
}
