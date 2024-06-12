"use client";

export interface RowsAndSelectedValueProps {
  rows: string[];
  selectedValues: { [key: string]: string };
}

interface postTaskForRowProps {
  listId: string;
  fieldId: string;
  row: string;
  selectedValue: number;
  rowsAndSelectedValues: RowsAndSelectedValueProps;
}

export async function postTaskForRow({
  listId,
  fieldId,
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

  if (postTaskData && postTaskData.id && fieldId) {
    const postCustomFieldResp = await fetch(
      `https://api.clickup.com/api/v2/task/${postTaskData.id}/field/${fieldId}?`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
        },
        body: JSON.stringify({ value: selectedValue }),
      },
    );
    const postCustomFieldCharge = await postCustomFieldResp.json();
    console.log(postCustomFieldCharge, `postCustomFieldCharge`);
  }
}
