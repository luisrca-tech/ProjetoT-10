export async function postTasks(listId: string) {
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
      }),
    },
  );

  const data = await resp.json();
  console.log(data);
}
