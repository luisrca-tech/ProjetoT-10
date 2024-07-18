import { toast } from "react-toastify";

export async function getCustomFields(listId: string) {
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/field`,
    {
      method: "GET",
      headers: {
        "Content-Type": "string",
        Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P", //mocado.
      },
    },
  );

  const responseBody = await response.json();

  return responseBody.fields;
}
