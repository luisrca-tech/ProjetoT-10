"use client";

import { useAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { checkedAtom } from "~/@atom/ProjectStates/checkedAtom";
import { isDatePickerOpenAtom } from "~/@atom/ProjectStates/isDatePickerOpenAtom";
import { rangesAtom } from "~/@atom/ProjectStates/rangesAtom";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import FormSelectInput from "~/components/forms/FormSelectInput";
import { useTasksOfProject } from "~/hooks/useTasksOfProject";
import { type Task } from "~/server/types/Clickup.type";
import { useAddRow } from "~/utils/functions/addRow";
import { useCanAddRow } from "~/utils/functions/canAddRow";
import { useInitializeRowsAndRanges } from "~/utils/functions/initializeRowsAndRanges";
import { showToast } from "~/utils/functions/showToast";
import { Container } from "./styles";
export function FormContainer() {
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");
  const router = useRouter();
  const [isDatePickerOpen] = useAtom(isDatePickerOpenAtom);
  const { tasksOfProject, isFetchAllCustomFields, missingFields } =
    useTasksOfProject();

  const [rowsAndSelectedValues, setRowsAndSelectedValues] = useAtom(
    rowsAndSelectedValuesAtom
  );

  const [, setChecked] = useAtom(checkedAtom);
  const [rowsUpdated, setRowsUpdated] = useState(() => {
    return !projectId ? true : false;
  });
  const [, setRanges] = useAtom(rangesAtom);
  const [isInitialized, setIsInitialized] = useState(false);
  const canInitializeRowsAndRanges =
    !projectId &&
    rowsAndSelectedValues.rows.length === 0 &&
    isFetchAllCustomFields;

  const updateRowsAndSelectedValues = useCallback(
    (tasksOfProject: Task[]) => {
      const newRows: string[] = [];
      const newSelectedValues: Record<string, any> = {};
      const newRanges: Record<string, any> = {};
      let chargeName = "";

      tasksOfProject.forEach((task) => {
        const rowKey = uuidv4();
        const newRow = `row-${rowKey}`;
        const chargeField = task.custom_fields.find(
          (field) => field.name === "PixelCraft_cargos"
        );
        const hoursPMonthField = task.custom_fields.find(
          (field) => field.name === "PixelCraft_Horas_Mes"
        );
        const workValueField = task.custom_fields.find(
          (field) => field.name === "PixelCraft_Valor"
        );

        const taskStartDate = task.start_date
          ? new Date(parseInt(task.start_date))
          : new Date();
        const taskDueDate = task.due_date
          ? new Date(parseInt(task.due_date))
          : new Date();

        const chargeOptions = chargeField?.type_config?.options;
        const chargeValue = chargeField?.value;

        if (chargeOptions && typeof chargeValue === "number") {
          chargeName = chargeOptions[chargeValue]?.name ?? "";
        }

        const cargoValue = chargeField ? `${chargeField.value}` : "";
        const horasValue = hoursPMonthField ? `${hoursPMonthField.value}` : "";
        const valorValue = workValueField ? `${workValueField.value}` : "";

        newRows.push(newRow);

        newSelectedValues[`firstTextValue${newRow}-text`] = chargeName;
        newSelectedValues[`firstTextValue${newRow}-option`] = cargoValue;
        newSelectedValues[`secondTextValue${newRow}-text`] = horasValue;
        newSelectedValues[`thirdTextValue${newRow}-text`] = valorValue;
        newSelectedValues[`reqMethod${newRow}`] = "PUT";
        newSelectedValues[`taskId${newRow}`] = task.id;
        newRanges[newRow] = {
          endDate: taskDueDate,
          isSelected: true,
          key: `selection-row-${rowKey}`,
          startDate: taskStartDate,
        };
      });

      setRowsAndSelectedValues((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, ...newRows],
        selectedValues: {
          ...prevState.selectedValues,
          ...newSelectedValues,
        },
      }));

      setRanges((prevState) => ({
        ...prevState,
        ...newRanges,
      }));
    },
    [setRowsAndSelectedValues, setRanges]
  );

  const initializeRowsAndRanges = useInitializeRowsAndRanges({
    canInitializeRowsAndRanges,
  });
  const addRow = useAddRow();
  const canAddRow = useCanAddRow({ rowsUpdated });

  const resetStates = useCallback(() => {
    setRowsAndSelectedValues({
      rows: [],
      selectedValues: {},
    });

    setRanges({});
    setRowsUpdated(false);
    setIsInitialized(false);
    setChecked(false);
  }, [setRowsAndSelectedValues, setRanges, setChecked]);

  useEffect(() => {
    if (missingFields) {
      showToast(
        "error",
        "Erro ao carregar projeto",
        `${missingFields} não existem na lista.`
      );
      router.push("/painel-administrativo/projetos");
    }
  }, [missingFields, router, rowsAndSelectedValues.selectedValues]);

  useEffect(() => {
    if (!isInitialized && isFetchAllCustomFields) {
      initializeRowsAndRanges();
      setIsInitialized(true);
    }
  }, [
    isInitialized,
    isFetchAllCustomFields,
    initializeRowsAndRanges,
    resetStates,
  ]);

  useEffect(() => {
    if (projectId && tasksOfProject) {
      resetStates();
      updateRowsAndSelectedValues(tasksOfProject);
      setRowsUpdated(true);

      return () => {
        resetStates();
      };
    }
  }, [
    projectId,
    resetStates,
    setRanges,
    setRowsAndSelectedValues,
    tasksOfProject,
    updateRowsAndSelectedValues,
  ]);

  useEffect(() => {
    if (!!canAddRow() && rowsUpdated) {
      addRow();
    }
  }, [canAddRow, addRow, rowsAndSelectedValues.rows, rowsUpdated]);

  return (
    <Container isDatePickerOpen={isDatePickerOpen}>
      <FormSelectInput onReset={resetStates} />
    </Container>
  );
}
