"use client";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

interface postTaskForRowProps {
  listId: string;
  fieldsIds: { chargeFieldId: string; projectFieldId: string };
  row: string;
  selectedValue: number;
  rowsAndSelectedValues: RowsAndSelectedValueProps;
}

export async function postTaskForRow({
  listId,
  fieldsIds,
  row,
  selectedValue,
}: postTaskForRowProps) {
  const query = new URLSearchParams({
    custom_task_ids: "true",
    team_id: "123",
  }).toString();

  const numberRow = row.replace("row-", "");

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
      }),
    },
  );

  console.log(selectedValue, `SelectedValue`);

  const postTaskData = await postTaskResp.json();
  console.log(postTaskData, `postTaskData`);

  if (postTaskData && postTaskData.id && fieldsIds) {
    const postChargeCustomFieldResp = await fetch(
      `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldsIds.chargeFieldId}?`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
        },
        body: JSON.stringify({ value: selectedValue }),
      },
    );
    const postCustomFieldCharge = await postChargeCustomFieldResp.json();
    console.log(postCustomFieldCharge, `postCustomFieldCharge`);

    const postProjectCustomFieldResp = await fetch(
      `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldsIds.projectFieldId}?`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
        },
        body: JSON.stringify({ value: selectedValue }),
      },
    );
    const postCustomFieldProject = await postProjectCustomFieldResp.json();
    console.log(postCustomFieldProject, `postCustomFieldCharge`);
  }
}
