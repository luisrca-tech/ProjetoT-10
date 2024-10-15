"use client";

import Button from "~/components/widgets/Button";
import { FormHeader } from "../../FormHeader";
import { FormFooter } from "../../FormFooter";
import { Container } from "./styles";
import ToggleSwitch from "~/components/widgets/ToggleSwitch";
import { TableData } from "./MirrorTablePresenter";
import { Budget } from "~/components/widgets/Budget";
import { type TasksInfosType } from "~/server/types/Clickup.type";
import { useRouter, useSearchParams } from "next/navigation";
import { SkeletonContainer } from "~/components/forms/FormSelectInput/InputsDataContainer/styles";
import { Skeleton } from "~/components/widgets/Skeleton";

type BudgetInfo = {
  totalDays: number;
  totalHours: number;
  totalValue: string | number;
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
    router.push(`/${page}?projectId=${projectId}`);
  }
  return (
    <Container>
      <ToggleSwitch />
      <FormHeader />
      {!!tasksCustomFields ? (
        <TableData tasksCustomFields={tasksCustomFields} />
      ) : (
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonContainer key={index}>
              <Skeleton
                style={{ borderRadius: "60px" }}
                width="95%"
                height="1.25rem"
              />
            </SkeletonContainer>
          ))}
        </div>
      )}
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
