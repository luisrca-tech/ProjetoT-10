import { z } from "zod";

export const formPersonsSchema = z.object({
  names: z.array(
    z
      .string()
      .regex(/^[a-zA-Zà-úÀ-ÚçÇñÑ\s'`~^¨]*$/, "Nomes não podem conter números .")
  ),
});
