import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

type CustomField = {
  id: string;
  name: string;
  type: string;
  type_config: {
    new_drop_down: boolean;
    options: {
      id: string;
      name: string;
      color: string | null;
      orderindex: number;
    };
  };
  date_created: string;
  hide_from_guests: boolean;
  required: boolean;
  value: string[];
};

export const clickupRouter = createTRPCRouter({
  getCustomFields: publicProcedure
    .input(z.object({ listId: z.string() }))
    .query<CustomField[]>(async ({ input }) => {
      const response = await fetch(
        `https://api.clickup.com/api/v2/list/${input.listId}/field`,
        {
          method: "GET",
          headers: {
            "Content-Type": "string",
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

      return responseBody.fields;
    }),
});
