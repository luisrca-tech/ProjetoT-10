import { z } from "zod";

export const configurationSchemaTrpc = z.object({
  pk: z.string(),
  listId: z.string(),
  userId: z.string(),
});
