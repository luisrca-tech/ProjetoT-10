import { z } from "zod";

export const configurationSchema = z.object({
  listId: z
    .string()
    .min(1, "Este campo precisa ser preenchido")
    .regex(/^\d+$/, "Este campo permite apenas números"),
  pk: z.string(),
});
