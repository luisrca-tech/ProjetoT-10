"use client";

export async function getTasks() {
  const query = new URLSearchParams({
    custom_task_ids: "true",
    team_id: "123",
  }).toString();
  const listId = "901303987731";
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
    {
      method: "GET",
      headers: {
        Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
      },
    }
  );
  const responseBody = await response.json();
  if (response.status === 401) {
    console.log(`Erro :${responseBody.err}`);
    console.log(`Erro :listId sem autorizacao.`);

    return responseBody.err;
  }
  return responseBody.tasks;
}
