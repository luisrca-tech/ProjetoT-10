"use client";

import { Container, MainContainer, FormContainer } from "./styles";
import { useAtom } from "jotai";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import { ProjectProfileHeader } from "../ProjectProfileHeader";
import ToggleSwitch from "../../widgets/ToggleSwitch";
import FormSelectInput from "../../forms/FormSelectInput";
import { CloseCalendarContainer } from "./CloseCalendarContainer";
import { useTasksOfProject } from "~/app/hooks/useTasksOfProject";
import { useEffect } from "react";
import { showToast } from "~/utils/functions/showToast";
import { useRouter } from "next/navigation";

export function ProjectDetailsContent() {
  const router = useRouter();
  const [isDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const { tasksOfProject, isFetchAllCustomFields, missingFields } =
    useTasksOfProject();
  const isDataFetched = !!tasksOfProject && !!isFetchAllCustomFields;

  useEffect(() => {
    if (missingFields) {
      showToast(
        "error",
        "Erro ao carregar projeto",
        `${missingFields} não existem na lista.`
      );

      router.push("/painel-administrativo/projetos");
    }
  }, [isDataFetched, missingFields, router]);

  return (
    <Container>
      {isFetchAllCustomFields && (
        <>
          <ProjectProfileHeader />
          <MainContainer>
            {isDatePickerOpen && <CustomDateRangePicker />}
            <FormContainer isDatePickerOpen={isDatePickerOpen}>
              <ToggleSwitch />
              <FormSelectInput />
            </FormContainer>
          </MainContainer>
          <CloseCalendarContainer />
        </>
      )}
    </Container>
  );
}
