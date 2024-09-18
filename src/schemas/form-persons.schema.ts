import { z } from "zod";

export const formPersonsSchema = z.object({
  names: z.array(
    z
      .string()
      .regex(
        /^[a-zA-Z\s]*$/,
        "Nomes não podem conter números ou caracteres especiais."
      )
  ),
});
