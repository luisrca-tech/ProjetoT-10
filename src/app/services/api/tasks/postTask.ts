"use client";

import { postTaskForRow } from "./postTaskForRow";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

interface postTasksProps {
  fieldsIds: { chargeFieldId: string; projectFieldId: string };
  rowsAndSelectedValues: RowsAndSelectedValueProps;
}

function getOptionValueForRow(
  row: string,
  selectedValues: { [key: string]: string },
): number {
  const optionKey = `firstTextValue${row}-option`;
  console.log(`cargo da posicao atual`, Number(selectedValues[optionKey]));
  return Number(selectedValues[optionKey]);
}

export async function postTasks({
  fieldsIds,
  rowsAndSelectedValues,
}: postTasksProps) {
  const rows = rowsAndSelectedValues.rows;
  const listId = "901303987731"; //mocado.

  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    const selectedValue = getOptionValueForRow(
      row,
      rowsAndSelectedValues.selectedValues,
    );
    await postTaskForRow({
      listId,
      fieldsIds,
      row,
      selectedValue,
      rowsAndSelectedValues,
    });
  }
}
