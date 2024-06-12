"use client";

import { postTaskForRow } from "./postTaskFormRow";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

interface postTasksProps {
  listId: string;
  fieldId: string;
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
  listId,
  fieldId,
  rowsAndSelectedValues,
}: postTasksProps) {
  const rows = rowsAndSelectedValues.rows;
  for (let i = 0; i < rows.length - 1; i++) {
    const row = rows[i];
    const selectedValue = getOptionValueForRow(
      row,
      rowsAndSelectedValues.selectedValues,
    );
    await postTaskForRow({
      listId,
      fieldId,
      row,
      selectedValue,
      rowsAndSelectedValues,
    });
  }
}
