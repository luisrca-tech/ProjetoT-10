"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { showToast } from "~/utils/functions/showToast";
import FormSelectInput from "../../forms/FormSelectInput";
import { CustomDateRangePicker } from "../../widgets/CustomDateRangePicker";
import ToggleSwitch from "../../widgets/ToggleSwitch";
import { ProjectProfileHeader } from "../ProjectProfileHeader";
import { CloseCalendarContainer } from "./CloseCalendarContainer";
import { Container, FormContainer, MainContainer } from "./styles";

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
