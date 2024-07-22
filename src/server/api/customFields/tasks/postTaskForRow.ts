"use client";

import { type SelectableRangeProps } from "~/@atom/ProjectStates/rangesAtom";

export interface RowsAndSelectedValueProps {
  rows: string[];
  chargeFieldSelectedValue: { [key: string]: string };
}

interface postTaskForRowProps {
  listId: string;
  fieldsIds: {
    chargeFieldId: string;
    projectFieldId: string;
    valueFieldId: string;
    hoursPerMonthCustomFieldId: string;
  };
  row: string;
  chargeFieldSelectedValue: number;
  projectFieldSelectedValue: string;
  valueSelectedValue: number;
  hoursPerMonthCustom: number;
  FieldDateSelectedValue: SelectableRangeProps;
}

export async function postTaskForRow({
  listId,
  fieldsIds,
  row,
  chargeFieldSelectedValue,
  projectFieldSelectedValue,
  valueSelectedValue,
  hoursPerMonthCustom,
  FieldDateSelectedValue,
}: postTaskForRowProps) {
  const query = new URLSearchParams({
    custom_task_ids: "true",
    team_id: "123",
  }).toString();

  const numberRow = row.replace("row-", "");

  if (FieldDateSelectedValue) {
    const postTaskResp = await fetch(
      `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
        },
        body: JSON.stringify({
          name: `Pessoa-${numberRow}`,
          start_date: FieldDateSelectedValue?.startDate?.getTime(),
          due_date: FieldDateSelectedValue?.endDate?.getTime(),
        }),
      }
    );

    const postTaskData = await postTaskResp.json();
    if (postTaskData && postTaskData.id && fieldsIds) {
      const postChargeCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldsIds.chargeFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: chargeFieldSelectedValue }),
        }
      );
      const postCustomFieldCharge = await postChargeCustomFieldResp.json();

      const postProjectCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldsIds.projectFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: [projectFieldSelectedValue] }),
        }
      );
      const postCustomFieldProject = await postProjectCustomFieldResp.json();

      const valueCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldsIds.valueFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: valueSelectedValue }),
        }
      );

      const postCustomFieldValue = await valueCustomFieldResp.json();

      const hoursPerMonthCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldsIds.hoursPerMonthCustomFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: hoursPerMonthCustom }),
        }
      );

      const postCustomFieldhoursPerMonth =
        await hoursPerMonthCustomFieldResp.json();
    }
  }
}
