import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { EndPointClickUpApiEnum } from "~/clickUpApi/EndPointClickUpApiEnum";
import { type CustomField } from "~/server/types/Clickup.type";
import { showToast } from "~/utils/functions/showToast";
import { type Task } from "~/server/types/Clickup.type";
const listId = "901305118368";
const authorizationToken = process.env.CLICKUP_API_TOKEN;

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
            Authorization: authorizationToken ? authorizationToken : "",
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
            Authorization: authorizationToken ? authorizationToken : "",
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

  postTask: publicProcedure
    .input(
      z.object({
        row: z.string().optional(),
        Dates: z.object({
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        }),
      })
    )
    .mutation(async ({ input }) => {
      const { row, Dates } = input;

      const query = new URLSearchParams({
        custom_task_ids: "true",
        team_id: "123",
      }).toString();

      const numberRow = row?.replace("row-", "");

      const postTaskResp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken ? authorizationToken : "",
          },
          body: JSON.stringify({
            name: `Pessoa-${numberRow}`,
            start_date: Dates.startDate?.getTime(),
            due_date: Dates.endDate?.getTime(),
          }),
        }
      );
      const postTaskData = await postTaskResp.json();
      const taskId = postTaskData.id;
      return { taskId, postTaskData };
    }),

  updateTask: publicProcedure
    .input(
      z.object({
        row: z.string().optional(),
        Dates: z.object({
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        }),
        taskId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { row, Dates, taskId } = input;

      const query = new URLSearchParams({
        custom_task_ids: "true",
        team_id: "123",
      }).toString();

      const numberRow = row?.replace("row-", "");
      const updateTaskResp = await fetch(
        `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken ? authorizationToken : "",
          },
          body: JSON.stringify({
            name: `Pessoa-${numberRow}`,
            start_date: Dates.startDate?.getTime(),
            due_date: Dates.endDate?.getTime(),
          }),
        }
      );
      const updateTaskData = await updateTaskResp.json();
      return { taskId, updateTaskData };
    }),

  postChargeCustomField: publicProcedure
    .input(
      z.object({
        postTaskId: z.string(),
        chargeFieldId: z.string().optional(),
        chargeFieldSelectedValue: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { postTaskId, chargeFieldId, chargeFieldSelectedValue } = input;
      const postChargeCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskId}/field/${chargeFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: chargeFieldSelectedValue }),
        }
      );
      const postChargeCustomFieldData = await postChargeCustomFieldResp.json();
      return postChargeCustomFieldData;
    }),

  postProjectCustomField: publicProcedure
    .input(
      z.object({
        postTaskId: z.string(),

        projectFieldId: z.string().optional(),

        projectFieldSelectedValue: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { postTaskId, projectFieldId, projectFieldSelectedValue } = input;

      const postProjectCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskId}/field/${projectFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: [projectFieldSelectedValue] }),
        }
      );
      const postProjectCustomFieldData =
        await postProjectCustomFieldResp.json();
      return postProjectCustomFieldData;
    }),

  postValueCustomField: publicProcedure
    .input(
      z.object({
        postTaskId: z.string(),
        valueFieldId: z.string().optional(),
        valueFieldSelectedValue: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { postTaskId, valueFieldId, valueFieldSelectedValue } = input;
      const postValueCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskId}/field/${valueFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: valueFieldSelectedValue }),
        }
      );
      const postValueCustomFieldData = await postValueCustomFieldResp.json();
      return postValueCustomFieldData;
    }),

  postHourPMonthCustomField: publicProcedure
    .input(
      z.object({
        postTaskId: z.string(),
        hoursPerMonthCustomFieldId: z.string().optional(),
        hoursPMonthFieldSelectedValue: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const {
        postTaskId,
        hoursPerMonthCustomFieldId,
        hoursPMonthFieldSelectedValue,
      } = input;
      const postHourPMonthCustomFieldResp = await fetch(
        `https://api.clickup.com/api/v2/task/${postTaskId}/field/${hoursPerMonthCustomFieldId}?`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "pk_81997206_S36OVHASAWZPBXJNMUNGQO4F1XJHEI8P",
          },
          body: JSON.stringify({ value: hoursPMonthFieldSelectedValue }),
        }
      );
      const postHourPMonthCustomFieldData =
        await postHourPMonthCustomFieldResp.json();
      return postHourPMonthCustomFieldData;
    }),
});
