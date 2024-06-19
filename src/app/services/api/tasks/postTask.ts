"use client";

import { SelectableRangeProps } from "@/@atom/ProjectStates/rangesAtom";
import { postTaskForRow } from "./postTaskForRow";
import { ProjectSelectedValueProps } from "@/@atom/ProjectStates/projectSelectedValue";
export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

interface DatesFieldSelectedValue {
  row: string;
  ranges: { [key: string]: SelectableRangeProps };
}
interface postTasksProps {
  fieldsIds: {
    chargeFieldId: string;
    projectFieldId: string;
    valueFieldId: string;
    hoursPerMonthCustomFieldId: string;
  };
  rowsAndSelectedValues: RowsAndSelectedValueProps;
  projectSelectedValue: ProjectSelectedValueProps;
  ranges: { [key: string]: SelectableRangeProps };
}
interface ChargeFieldSelectedValue {
  chargeValueNumber: number;
  hoursPerMonthValueNumber: number;
  hourPerValueNumber: number;
}
export async function postTasks({
  fieldsIds,
  rowsAndSelectedValues,
  projectSelectedValue,
  ranges,
}: postTasksProps) {
  const rows = rowsAndSelectedValues.rows;

  const projectFieldSelectedValue =
    projectSelectedValue.selectedValues["projectRow-option"];

  const listId = "901303987731"; //mocado.

  function getOptionValueForRow(
    row: string,
    selectedValues: { [key: string]: string },
  ): ChargeFieldSelectedValue {
    const firstValue = `firstTextValue${row}-option`;
    const secondValue = `secondTextValue${row}-text`;
    const thirdValue = `thirdTextValue${row}-text`;

    const chargeValueNumber = Number(selectedValues[firstValue]);
    const hoursPerMonthValueNumber = Number(selectedValues[secondValue]);
    const hourPerValueNumber = Number(selectedValues[thirdValue]);

    return {
      chargeValueNumber,
      hoursPerMonthValueNumber,
      hourPerValueNumber,
    };
  }

  function getOptionDateForRow({ row, ranges }: DatesFieldSelectedValue) {
    const valueDateRow = ranges[row];

    return valueDateRow;
  }

  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    const FieldSelectedValue = getOptionValueForRow(
      row,
      rowsAndSelectedValues.selectedValues,
    );
    const chargeFieldSelectedValue = FieldSelectedValue.chargeValueNumber;
    const valueSelectedValue = FieldSelectedValue.hourPerValueNumber;
    const hoursPerMonthCustom = FieldSelectedValue.hoursPerMonthValueNumber;

    const FieldDateSelectedValue = getOptionDateForRow({ row, ranges });

    await postTaskForRow({
      listId,
      fieldsIds,
      row,
      chargeFieldSelectedValue,
      projectFieldSelectedValue,
      valueSelectedValue,
      hoursPerMonthCustom,
      FieldDateSelectedValue,
    });
  }
}
