import Button from "~/components/widgets/Button";
import { FormHeader } from "../../FormHeader";
import { FormFooter } from "../../FormFooter";
import { Container } from "./styles";
import ToggleSwitch from "~/components/widgets/ToggleSwitch";
import { TableData } from "./MirrorTablePresenter";
import { Budget } from "~/components/widgets/Budget";
import { type TasksInfosType } from "~/server/types/Clickup.type";
import { useRouter, useSearchParams } from "next/navigation";

type BudgetInfo = {
  totalDays: number;
  totalHours: number;
  totalValue: number;
};
type MirrorTableProps = {
  budgetInfo: BudgetInfo;
  tasksCustomFields: TasksInfosType;
};
export function MirrorTableContainer({
  budgetInfo,
  tasksCustomFields,
}: MirrorTableProps) {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("projectId");
  const router = useRouter();

  function HandleRedirectToPages(page: string) {
    router.push(`/painel-administrativo/${page}?projectId=${projectId}`);
  }
  return (
    <Container>
      <ToggleSwitch />
      <FormHeader />
      <TableData tasksCustomFields={tasksCustomFields} />
      <FormFooter>
        <Budget budgetInfo={budgetInfo} />
        <Button
          text="Alterar projeto"
          type="button"
          onClick={() => HandleRedirectToPages("projeto")}
        />
        <Button
          text="Definir pessoas"
          type="button"
          onClick={() => HandleRedirectToPages("pessoas")}
        />
      </FormFooter>
    </Container>
  );
}
