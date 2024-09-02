import { useAtom } from "jotai";
import { useState } from "react";
import { rowsAndSelectedValuesAtom } from "~/@atom/ProjectStates/rowsAndSelectedValuesAtom";
import {
  rangesAtom,
  type SelectableRangePropsType,
} from "~/@atom/ProjectStates/rangesAtom";
import { fieldsIdsAtom } from "~/@atom/api/CustomFields/fieldsIds";
import { projectSelectedValuePropAtom } from "~/@atom/ProjectStates/projectSelectedValue";
import { api } from "~/trpc/react";

export interface ChargeFieldSelectedValue {
  chargeValueNumber: number;
  hoursPerMonthValueNumber: number;
  hourPerValueNumber: number;
  reqMethod: string | undefined;
  taskId: string | undefined;
}

export function useProcessRows() {
  const [rowsAndSelectedValues] = useAtom(rowsAndSelectedValuesAtom);
  const [ranges] = useAtom(rangesAtom);
  const rows = rowsAndSelectedValues.rows;
  const [fieldsIds] = useAtom(fieldsIdsAtom);
  const [projectSelectedValue] = useAtom(projectSelectedValuePropAtom);
  const projectFieldSelectedValue =
    projectSelectedValue.selectedValue["projectRow-option"];

  const [reqMethodState, setReqMethodState] = useState<string | undefined>();
  const mutationUpdateTask = api.clickup.updateTask.useMutation();
  const mutationPostTask = api.clickup.postTask.useMutation();
  const mutationChargeCustomField =
    api.clickup.postChargeCustomField.useMutation();
  const mutationProjectCustomField =
    api.clickup.postProjectCustomField.useMutation();
  const mutationHourPMonthCustomField =
    api.clickup.postHourPMonthCustomField.useMutation();
  const mutationValueCustomField =
    api.clickup.postValueCustomField.useMutation();

  function getOptionValueForRow(
    row: string,
    selectedValues: { [key: string]: string }
  ): ChargeFieldSelectedValue {
    const firstValue = `firstTextValue${row}-option`;
    const secondValue = `secondTextValue${row}-text`;
    const thirdValue = `thirdTextValue${row}-text`;
    const reqMethod = selectedValues[`reqMethod${row}`];
    const taskId = selectedValues[`taskId${row}`];

    const chargeValueNumber = Number(selectedValues[firstValue]);
    const hoursPerMonthValueNumber = Number(selectedValues[secondValue]);
    const hourPerValueNumber = Number(selectedValues[thirdValue]);

    return {
      chargeValueNumber,
      hoursPerMonthValueNumber,
      hourPerValueNumber,
      reqMethod,
      taskId,
    };
  }

  function getOptionDateForRow({
    row,
    ranges,
  }: {
    row: string;
    ranges: { [key: string]: SelectableRangePropsType };
  }) {
    const valueDateRow = ranges[row];
    return valueDateRow;
  }

  async function processRows() {
    for (let i = 0; i < rows.length - 1; i++) {
      const row = rows[i] as string;
      const FieldSelectedValue = getOptionValueForRow(
        row,
        rowsAndSelectedValues.selectedValues
      );
      const chargeFieldSelectedValue = FieldSelectedValue.chargeValueNumber;
      const valueFieldSelectedValue = FieldSelectedValue.hourPerValueNumber;
      const hoursPMonthFieldSelectedValue =
        FieldSelectedValue.hoursPerMonthValueNumber;
      const reqMethod = FieldSelectedValue.reqMethod;

      // Atualizando o estado aqui
      const FieldDateSelectedValue = getOptionDateForRow({ row, ranges });
      const startDate = FieldDateSelectedValue?.startDate;
      const endDate = FieldDateSelectedValue?.endDate;

      if (FieldDateSelectedValue) {
        let taskId;

        if (reqMethod === "PUT") {
          taskId = FieldSelectedValue.taskId;
          await mutationUpdateTask.mutateAsync({
            row: row,
            Dates: { startDate, endDate },
            taskId: taskId,
          });
          setReqMethodState("PUT");
        } else {
          const postTaskResp = await mutationPostTask.mutateAsync({
            row: row,
            Dates: { startDate, endDate },
          });
          setReqMethodState("POST");
          taskId = postTaskResp.taskId;
        }

        if (taskId && fieldsIds) {
          await mutationChargeCustomField.mutateAsync({
            postTaskId: taskId,
            chargeFieldId: fieldsIds.chargeFieldId,
            chargeFieldSelectedValue: chargeFieldSelectedValue,
          });

          await mutationProjectCustomField.mutateAsync({
            postTaskId: taskId,
            projectFieldId: fieldsIds.projectFieldId,
            projectFieldSelectedValue: projectFieldSelectedValue,
          });

          await mutationValueCustomField.mutateAsync({
            postTaskId: taskId,
            valueFieldId: fieldsIds.valueFieldId,
            valueFieldSelectedValue: valueFieldSelectedValue,
          });

          await mutationHourPMonthCustomField.mutateAsync({
            postTaskId: taskId,
            hoursPerMonthCustomFieldId: fieldsIds.hoursPerMonthCustomFieldId,
            hoursPMonthFieldSelectedValue: hoursPMonthFieldSelectedValue,
          });
        }
      }
    }
  }

  return {
    processRows,
    reqMethod: reqMethodState,
  };
}
