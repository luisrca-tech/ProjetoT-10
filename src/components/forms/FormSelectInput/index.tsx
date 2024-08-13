import { Container } from "./styles";
import InputsDataContainer from "./InputsDataContainer";

import { FormHeader } from "./FormHeader";

import { Budget } from "./Budget";
import { useAtom } from "jotai";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import {
  rangesAtom,
  type SelectableRangePropsType,
} from "~/@atom/ProjectStates/rangesAtom";

import Button from "../../widgets/Button";
import { FormFooter } from "./FormFooter";
import { loadingAtom } from "~/@atom/LoadingState/loadingAtom";

import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { showToast } from "~/utils/functions/showToast";
import { type FormEvent } from "react";
import { useProcessRows } from "~/app/hooks/useProcessRows";

export default function FormSelectInput() {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const [ranges] = useAtom(rangesAtom);
  const { processRows } = useProcessRows();
  const rangesCondition = validateRanges(ranges);

  const selectedValuesNotEmpty2 =
    Object.keys(projectSelectedValue.selectedValue).length > 0;

  const selectedValuesNotEmpty1 = Object.values(
    rowsAndSelectedValues.selectedValues
  ).every((value) => value !== "");

  const isConditionMet =
    rangesCondition && selectedValuesNotEmpty1 && selectedValuesNotEmpty2;

  function validateRanges(ranges: {
    [key: string]: SelectableRangePropsType;
  }): boolean {
    const keys = Object.keys(ranges);

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i] as string;
      if (!ranges[key]?.startDate || !ranges[key]?.endDate) {
        return false;
      }
    }

    return true;
  }

  async function taskPostRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      await processRows();
      showToast(
        "success",
        "Tasks criadas e vinculadas ao NOME DO PROJETO",
        "Alterações no clickup já podem ser visualizadas"
      );
    } catch (error) {
      showToast(
        "error",
        "Não foi possível concluir a criação das Tasks",
        "Algum erro inesperado ocorreu, contate nossa equipe"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container onSubmit={taskPostRequest}>
      <FormHeader />
      <InputsDataContainer />

      <FormFooter>
        <Budget />
        <Button
          text="Salvar"
          disabled={!isConditionMet}
          loading={loading}
          type="submit"
        />
      </FormFooter>
    </Container>
  );
}
