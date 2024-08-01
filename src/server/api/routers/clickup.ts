import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import { type CustomField } from "~/app/types/clickUpApi";
import { showToast } from "~/utils/functions/showToast";
import { type Task } from "~/app/types/clickUpApi";

const listId = "901303987731";

export const clickupRouter = createTRPCRouter({
  getCustomFields: publicProcedure
    .input(z.object({ endPoint: EndPointClickUpApiEnum }))
    .query<CustomField[]>(async ({ input }) => {
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/${input.endPoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
        }
      );
      const responseBody = await response.json();
      if (response.status === 401) {
        showToast(
          "error",
          "Erro de autorização ao acessar CustomFields!",
          "Confira seus listId e AuthorizationToken"
        );
        return null;
      }
      return responseBody.fields;
    }),

  getTasks: publicProcedure
    .input(z.object({ endPoint: EndPointClickUpApiEnum }))
    .query<Task[]>(async ({ input }) => {
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/${input.endPoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
        }
      );
      const responseBody = await response.json();
      if (response.status === 401) {
        showToast(
          "error",
          "Erro de autorização ao acessar CustomFields!",
          "Confira seus listId e AuthorizationToken"
        );
        return null;
      }
      return responseBody.tasks;
    }),
});
