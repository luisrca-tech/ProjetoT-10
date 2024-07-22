import { toast } from "react-toastify";

export type ClickUpFetchProps = {
  body?: unknown;
  headers?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE" | "UPDATE";
  endPoint: string;
  params?: Record<string, any>;
};

export async function clickUpFetch<T = any>({
  //   body,
  method,
  endPoint,
  //   token, por enquanto, nao preciso lidar com token de usuario, so do clickup, que vai estar global.
  params,
}: //   headers = {}, headers mockado por enquanto
ClickUpFetchProps) {
  let fetchParams;
  const listId = "901303987731";
  const correctHeaders: Record<string, string> = {
    Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
  };
  //   const bodyToFetch = isFormData ? body : JSON.stringify(body);

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
      toast.error(
        "Nao foi possivel carregar campos personalizados, confira listId"
      );
      return null;
    }
    return responseBody.fields;
  }

  if (endPoint === "task") {
    if (response.status === 401) {
      toast.error("Nao foi possivel carregar tarefas, confira listId");
      return null;
    }
    return responseBody.tasks;
  }
}
