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
  if (response.status === 401) {
    console.log(`Erro :${responseBody.err}`);
    console.log(`Erro :listId sem autorizacao.`);

    //tratamento de erro de autorizacao.
    return responseBody.err;
  }
  console.log(responseBody, `responseBody`);
  console.log(responseBody.fields, `responseBody.fields`);
  return responseBody.fields;
}
