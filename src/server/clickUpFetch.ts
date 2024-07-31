import { showToast } from "~/utils/functions/showToast";
export type ClickUpFetchProps = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "UPDATE";
  endPoint: string;
  params?: Record<string, any>;
};

export async function clickUpFetch<T = any>({
  method,
  endPoint,
}: ClickUpFetchProps) {
  const listId = "901303987731";
  const correctHeaders: Record<string, string> = {
    Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
  };

  if (endPoint === "field") {
    correctHeaders["Content-Type"] = "string";
  }
  const response = await fetch(
    `https://api.clickup.com/api/v2/list/${listId}/${endPoint}`,
    {
      method: method ?? "GET",
      headers: correctHeaders,
    }
  );

  const responseBody = await response.json();

  if (endPoint === "field") {
    if (response.status === 401) {
      showToast(
        "error",
        "Erro de autorização ao acessar CustomFields!",
        "Confira seus listId e AuthorizationToken"
      );
      return null;
    }
    return responseBody.fields;
  }

  if (endPoint === "task") {
    if (response.status === 401) {
      showToast(
        "error",
        "Erro de autorização ao acessar Tasks!",
        "Confira seus listId e AuthorizationToken"
      );
      return null;
    }
    return responseBody.tasks;
  }
}
