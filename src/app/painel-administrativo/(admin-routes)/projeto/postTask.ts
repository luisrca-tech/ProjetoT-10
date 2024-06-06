"use client";
import { useEffect } from "react";

interface postTasksProps {
  customFieldsResponse: Array<{}>;
  listId: string;
}

export async function postTasks({
  listId,
  customFieldsResponse,
}: postTasksProps) {
  const query = new URLSearchParams({
    custom_task_ids: "true",
    team_id: "123",
  }).toString();

  const resp = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
      },
      body: JSON.stringify({
        name: "Pessoa 1",
        customFields: customFieldsResponse,
        /*Aqui na verdade, sera passado o customField Cargo filtrado, 
       ja com os valores de cargo, valor hora e horas/mes preenchidos. */
      }),
    },
  );

  const data = await resp.json();
  console.log(data, `postTaskResponse`);
}
